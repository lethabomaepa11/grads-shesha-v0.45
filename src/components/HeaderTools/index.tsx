import {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useHistory} from '@docusaurus/router';
import styles from './styles.module.css';
import {
  buildKnowledgeContext,
  knowledgeDocs,
  searchKnowledge,
} from '@site/src/data/sheshaKnowledge';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AiAssistantResponse = {
  answer?: string;
  suggestedRoute?: string;
  suggestedRouteReason?: string;
  sources?: string[];
};

type CustomFields = {
  aiApiUrl?: string;
  aiModel?: string;
};

function extractJsonString(responseText: string) {
  const trimmed = responseText.trim();

  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  return trimmed;
}

function buildAiPrompt(question: string, chatHistory: ChatMessage[]) {
  const recentHistory = chatHistory.slice(-6);
  const transcript = recentHistory
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join('\n');

  return [
    'You are an assistant for a Shesha documentation site.',
    'Answer using only the provided knowledge context.',
    'When useful, guide the user to the best matching route in this site.',
    'If the answer is not in the context, say that directly and point to the closest local route.',
    'Return strict JSON with keys: answer, suggestedRoute, suggestedRouteReason, sources.',
    '',
    transcript ? `Conversation:\n${transcript}\n` : '',
    `Question: ${question}`,
    '',
    'Knowledge context:',
    buildKnowledgeContext(),
  ]
    .filter(Boolean)
    .join('\n');
}

export default function HeaderTools() {
  const history = useHistory();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {siteConfig} = useDocusaurusContext();
  const {aiApiUrl, aiModel} = (siteConfig.customFields ?? {}) as CustomFields;

  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const hasSearchQuery = Boolean(searchQuery.trim());
  const results = useMemo(
    () => (hasSearchQuery ? searchKnowledge(searchQuery) : knowledgeDocs).slice(0, 5),
    [hasSearchQuery, searchQuery],
  );

  useEffect(() => {
    if (!isChatOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsChatOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isChatOpen]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSearchQuery) {
      return;
    }

    const firstResult = results[0];
    if (firstResult) {
      history.push(firstResult.route);
      setSearchQuery('');
    }
  }

  async function handleAskAi(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    if (!aiApiUrl) {
      setError('AI_API_URL is not configured.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {role: 'user', content: trimmedQuestion};
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setQuestion('');

    try {
      const response = await fetch(aiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: aiModel || 'llama-3.3-70b-versatile',
          message: buildAiPrompt(trimmedQuestion, nextMessages),
        }),
      });

      if (!response.ok) {
        throw new Error(`AI request failed with status ${response.status}.`);
      }

      const payload = await response.json();
      if (!payload.success || typeof payload.response !== 'string') {
        throw new Error('The AI endpoint returned an unexpected response format.');
      }

      const parsed = JSON.parse(extractJsonString(payload.response)) as AiAssistantResponse;
      const assistantText = [
        parsed.answer,
        parsed.suggestedRoute
          ? `Suggested route: ${parsed.suggestedRoute}${
              parsed.suggestedRouteReason ? ` - ${parsed.suggestedRouteReason}` : ''
            }`
          : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      setMessages((current) => [
        ...current,
        {role: 'assistant', content: assistantText || 'No answer returned.'},
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'The assistant could not answer right now.';

      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'The assistant could not answer right now.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.headerTools}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <input
          aria-label="Search Shesha docs"
          className={styles.searchInput}
          type="search"
          placeholder="Search the Shesha docs"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {hasSearchQuery && results.length ? (
          <div className={styles.searchDropdown}>
            {results.map((doc) => (
              <Link
                key={doc.route}
                className={styles.searchResult}
                to={doc.route}
                onClick={() => setSearchQuery('')}>
                <span className={styles.searchResultCategory}>{doc.category}</span>
                <strong>{doc.title}</strong>
                <span>{doc.summary}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </form>

      <button
        type="button"
        className={styles.askAiButton}
        onClick={() => setIsChatOpen(true)}>
        Ask AI
      </button>

      {isChatOpen ? (
        <div className={styles.chatOverlay}>
          <div ref={modalRef} className={styles.chatModal}>
            <div className={styles.chatHeader}>
              <div>
                <strong>Ask AI</strong>
                <span>Grounded in the local Shesha docs</span>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsChatOpen(false)}>
                Close
              </button>
            </div>

            <div className={styles.chatBody}>
              {messages.length ? (
                messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={
                      message.role === 'user' ? styles.userBubble : styles.assistantBubble
                    }>
                    {message.content}
                  </div>
                ))
              ) : (
                <div className={styles.emptyChat}>
                  Ask about header forms, subforms, card crashes, or where to start.
                </div>
              )}
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}

            <form className={styles.chatForm} onSubmit={handleAskAi}>
              <textarea
                className={styles.chatInput}
                placeholder="Ask a question about Shesha..."
                rows={4}
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <div className={styles.chatFooter}>
                <span className={styles.modelLabel}>
                  Model: {aiModel || 'llama-3.3-70b-versatile'}
                </span>
                <button
                  type="submit"
                  className="button button--primary"
                  disabled={isLoading}>
                  {isLoading ? 'Thinking...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
