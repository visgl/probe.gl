import {getVitestConfig} from '@vis.gl/dev-tools';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

const includePatterns = ['modules/**/*.spec.{ts,js}'];
const excludePatterns = [
  '**/*.disabled.*',
  'modules/seer/test/**',
  'test/bench/**',
  'test/size/**'
];

export default getVitestConfig({
  tsconfigProjects: ['./tsconfig.json', './tsconfig.test.json'],
  excludePatterns,
  overrides: {
    plugins: [nodePolyfills()]
  },
  projects: {
    node: {
      test: {
        include: includePatterns,
        setupFiles: ['./test/utils/node-test-setup.js']
      }
    },
    browser: {
      test: {
        include: includePatterns,
        setupFiles: ['./test/utils/browser-test-setup.js']
      }
    },
    headless: {
      test: {
        include: includePatterns,
        setupFiles: ['./test/utils/browser-test-setup.js']
      }
    }
  },
  coverage: {
    include: ['modules/**/src/**/*.{js,ts,tsx}'],
    exclude: [
      '**/*.d.ts',
      '**/*.map',
      '**/*.{bundle,min}.{js,ts}',
      '**/{build,coverage,dist,node_modules,vendor,vendored}/**',
      'examples/**',
      'test/**',
      'modules/**/test/**'
    ]
  }
});
