const {getDocusaurusConfig} = require('@vis.gl/docusaurus-website');
const {resolve} = require('path');

const config = getDocusaurusConfig({
  projectName: 'probe.gl',
  tagline: 'JavaScript Console Logging, Instrumentation, Benchmarking and Test Utilities',
  siteUrl: 'https://visgl.github.io/probe.gl',
  repoUrl: 'https://github.com/visgl/probe.gl',

  docsTableOfContents: require('../docs/table-of-contents.json'),

  // examplesDir: './src/examples',
  // exampleTableOfContents: require('./src/examples/table-of-contents.json'),

  search: 'local',

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

module.exports = config;
