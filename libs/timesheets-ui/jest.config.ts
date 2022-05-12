export default {
  displayName: 'timesheets-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/timesheets-ui',
  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-tests.ts'],
  preset: '../../jest.preset.js',
};
