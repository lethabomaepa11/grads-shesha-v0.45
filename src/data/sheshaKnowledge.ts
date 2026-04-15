export type KnowledgeDoc = {
  title: string;
  route: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
};

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    title: 'What is Shesha',
    route: '/docs/intro',
    category: 'Get Started',
    tags: ['intro', 'overview', 'platform', 'low-code'],
    summary:
      'A high-level introduction to Shesha as a low-code application framework and starting point for the local docs experience.',
    content:
      'Shesha is presented here as a low-code application framework documentation experience. The site focuses on practical guides, front-end notes, and issue write-ups for a Shesha v0.45 learning track. The broader Shesha stack highlighted across the site includes ASP.NET Core, React, and Next.js for business application delivery.',
  },
  {
    title: 'Add a Header Form',
    route: '/docs/shesha-basics/adding-header',
    category: 'Front-End Basics',
    tags: ['header', 'forms', 'configuration studio', 'frontend', 'layout'],
    summary:
      'Explains how to expose an existing header form in Configuration Studio and render it in the frontend layout.',
    content:
      'To expose an existing header form, open the target module in Configuration Studio, choose Expose Existing, select the header form from the Shesha module, and confirm it appears in the forms list. Then update adminportal src/app/(main)/layout.tsx so MainLayout uses headerFormId with the correct module and name. The module value must match the module where the form was exposed or the frontend will not load the expected header.',
  },
  {
    title: 'Subform Component Not Displaying Data in Parent Form',
    route: '/docs/shesha-issues/subform',
    category: 'Issues',
    tags: ['subform', 'forms', 'binding', 'model type', 'property name'],
    summary:
      'Covers the common Shesha subform issue where data shows in a standalone form but not when rendered inside a parent form.',
    content:
      'When a form works standalone but not as a Subform component inside a parent form, the first fix is to clear the Property Name field in the Subform configuration. If the issue persists, verify that both the parent form and subform use the same Model Type. A property-name mismatch or model-type mismatch usually prevents the embedded form from binding and displaying data correctly.',
  },
  {
    title: 'Configuration Studio Crashes After Adding Custom Styles to a Card Component',
    route: '/docs/shesha-issues/shesha-card-crash-fix',
    category: 'Issues',
    tags: ['card', 'custom styles', 'crash', 'swagger', 'json', 'form configuration'],
    summary:
      'Documents the Shesha v0.45 unstable card custom-style crash and the JSON import/export workaround.',
    content:
      'In unstable Shesha v0.45, adding custom styles to a Card component can crash Configuration Studio and make the form uneditable. The workaround is to copy the form ID, call /api/services/Shesha/FormConfiguration/GetJson in Swagger, download the form JSON, find the affected card customStyle field, set it to an empty string, then re-import the JSON with /api/services/Shesha/FormConfiguration/ImportJson using itemId and file.',
  },
];

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

export function buildKnowledgeContext(limit = 4): string {
  return knowledgeDocs
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
