export default {
  displayName: 'web-ui',

  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-tests.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web-ui',
  preset: '../../jest.preset.js',
};
