/** @type {import('@vis.gl/dev-tools').OcularConfig} */
export default {
  lint: {
    paths: ['modules', 'examples', 'test']
  },

  entry: {
    bench: 'test/bench/index.ts',
    'bench-browser': 'test/bench/browser.ts',
    size: ['test/size/log.js', 'test/size/stat.js']
  }
};
