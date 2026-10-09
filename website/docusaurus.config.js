const {getDocusaurusConfig} = require('@vis.gl/docusaurus-website');
const {resolve} = require('path');
const {themes} = require('prism-react-renderer');

const config = getDocusaurusConfig({
  projectName: 'probe.gl',
  tagline: 'JavaScript Console Logging, Instrumentation, Benchmarking and Test Utilities',
  siteUrl: 'https://visgl.github.io/probe.gl',
  repoUrl: 'https://github.com/visgl/probe.gl',

  docsTableOfContents: require('../docs/table-of-contents.json'),

  // examplesDir: './src/examples',
  // exampleTableOfContents: require('./src/examples/table-of-contents.json'),

  search: 'local',
  customCss: [resolve(__dirname, 'src/styles.css')],
  themeConfig: {
    colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: false},
    prism: {theme: themes.github, darkTheme: themes.dracula}
  },

  webpackConfig: {
    resolve: {
      alias: {
        'website-examples': resolve('../examples')
      }
    }
  }
});

// Opt into all currently documented Docusaurus v4 behavior while v4 is in development.
config.future = {
  ...config.future,
  v4: true,
  faster: true
};

const websiteRoutePrefix = config.baseUrl.replace(/\/$/, '');
config.plugins = [
  ...(config.plugins || []),
  [
    '@signalwire/docusaurus-plugin-llms-txt',
    {
      siteTitle: 'probe.gl',
      siteDescription:
        'TypeScript logging, instrumentation, benchmarking and test utilities for browsers and Node.js.',
      // Include the base path and nested module API routes in the index hierarchy.
      depth: 5,
      enableDescriptions: true,
      includeOrder: ['/docs', '/docs/get-started/**', '/docs/articles/**', '/docs/modules/**'].map(
        (route) => `${websiteRoutePrefix}${route}`
      ),
      onRouteError: 'throw',
      content: {
        enableMarkdownFiles: true,
        enableLlmsFullTxt: false,
        relativePaths: false,
        includeBlog: false,
        includePages: false,
        includeDocs: true,
        includeVersionedDocs: false,
        includeGeneratedIndex: true,
        excludeRoutes: [`${websiteRoutePrefix}/examples/**`]
      }
    }
  ]
];

module.exports = config;
