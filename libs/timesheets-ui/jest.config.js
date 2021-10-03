module.exports = {
  displayName: 'timesheets-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/timesheets-ui',
  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-tests.ts'],
};
