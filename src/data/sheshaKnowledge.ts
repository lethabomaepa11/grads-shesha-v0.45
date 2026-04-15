export type KnowledgeDoc = {
  title: string;
  route: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
};

import {generatedKnowledgeDocs} from './generatedKnowledgeDocs';

export const knowledgeDocs: KnowledgeDoc[] = generatedKnowledgeDocs;

export function searchKnowledge(query: string): KnowledgeDoc[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return knowledgeDocs;
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return [...knowledgeDocs]
    .map((doc) => {
      const haystack = [
        doc.title,
        doc.category,
        doc.summary,
        doc.content,
        doc.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const score = terms.reduce((total, term) => {
        if (doc.title.toLowerCase().includes(term)) {
          return total + 5;
        }
        if (doc.tags.some((tag) => tag.toLowerCase().includes(term))) {
          return total + 4;
        }
        if (doc.summary.toLowerCase().includes(term)) {
          return total + 3;
        }
        if (haystack.includes(term)) {
          return total + 1;
        }
        return total;
      }, 0);

      return {doc, score};
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((item) => item.doc);
}

export function buildKnowledgeContext(query?: string, limit = 4): string {
  const docs = query ? searchKnowledge(query) : knowledgeDocs;

  return docs
    .slice(0, limit)
    .map((doc) =>
      [
        `Title: ${doc.title}`,
        `Route: ${doc.route}`,
        `Category: ${doc.category}`,
        `Summary: ${doc.summary}`,
        `Content: ${doc.content}`,
      ].join('\n'),
    )
    .join('\n\n');
}
