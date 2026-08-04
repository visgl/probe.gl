// This file contains webpack configuration settings that allow
// examples to be built against the source code in this repo instead
// of building against their installed version.
//
// This enables using the examples to debug the main library source
// without publishing or npm linking, with conveniences such hot reloading etc.

const resolve = require('path').resolve;
const {getOcularConfig} = require('@vis.gl/dev-tools');

// Support for hot reloading changes to the library:
const LOCAL_DEVELOPMENT_CONFIG = {
  mode: 'development',

  devtool: 'source-map',

  // this is required by draco
  node: {
    fs: 'empty'
  },

  resolve: {
    // Imports the library from its src directory in this repo
    alias: {}
  },

  module: {
    rules: [
      {
        // Unfortunately, webpack doesn't import library sourcemaps on its own...
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
};

async function addLocalDevSettings(config, opts) {
  const {aliases} = await getOcularConfig({
    root: resolve(__dirname, '..')
  });
  LOCAL_DEVELOPMENT_CONFIG.resolve.alias = aliases;

  config = Object.assign({}, LOCAL_DEVELOPMENT_CONFIG, config);
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  Object.assign(config.resolve.alias, LOCAL_DEVELOPMENT_CONFIG.resolve.alias);

  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.module.rules = config.module.rules.concat(LOCAL_DEVELOPMENT_CONFIG.module.rules);

  return config;
}

module.exports =
  (baseConfig, opts = {}) =>
  async (env) => {
    let config = baseConfig;

    if (env && env.local) {
      config = await addLocalDevSettings(config, opts);
    }

    // uncomment to debug
    // console.warn(JSON.stringify(config, null, 2));
    return config;
  };
