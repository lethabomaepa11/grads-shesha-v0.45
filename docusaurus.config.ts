import {themes as prismThemes} from 'prism-react-renderer';
import {existsSync} from 'node:fs';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const loadEnvFile = (process as NodeJS.Process & {
  loadEnvFile?: (path?: string) => void;
}).loadEnvFile;

if (loadEnvFile && existsSync('.env')) {
  loadEnvFile('.env');
}

const config: Config = {
  title: 'Shesha',
  tagline: 'Low-code application framework documentation',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://shesha-grads.vercel.app',
  baseUrl: '/',

  organizationName: 'lethabomaepa11',
  projectName: 'grads-shesha-v0.45',
  customFields: {
    aiApiUrl: process.env.AI_API_URL ?? '/api/ai',
    aiModel: process.env.AI_MODEL ?? 'llama-3.3-70b-versatile',
  },

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/lethabomaepa11/grads-shesha-v0.45/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/lethabomaepa11/grads-shesha-v0.45/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/SheshaLogo.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'Shesha Logo',
        src: 'img/SheshaLogo.png',
      },
      items: [],
    },
    footer: {
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Adding Header',
              to: '/docs/shesha-basics/adding-header',
            },
            {
              label: 'Subform Issue',
              to: '/docs/shesha-issues/subform',
            },
          ],
        },
        {
          title: 'Platform',
          items: [
            {
              label: 'Try Shesha',
              href: 'https://www.shesha.io',
            },
            {
              label: 'Official Docs',
              href: 'https://docs.shesha.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/shesha-io',
            },
          ],
        },
        {
          title: 'Explore',
          items: [
            {
              label: 'Get Started',
              to: '/docs/intro',
            },
            {
              label: 'Front-End Basics',
              to: '/docs/shesha-basics/adding-header',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shesha, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
