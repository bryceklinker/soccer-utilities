module.exports = {
  displayName: 'rest-api',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: [
    '<rootDir>/src/testing/setup-tests.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/rest-api',
};
