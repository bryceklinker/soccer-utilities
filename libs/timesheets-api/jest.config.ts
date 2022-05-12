export default {
  displayName: 'timesheets-api',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/timesheets-api',
  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-jest.ts'],
  preset: '../../jest.preset.js',
};
