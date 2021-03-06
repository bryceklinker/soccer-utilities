export default {
  displayName: 'common-ui',

  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-tests.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/common-ui',
  preset: '../../jest.preset.js',
};
