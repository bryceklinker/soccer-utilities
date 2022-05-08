module.exports = {
  displayName: 'core',

  setupFilesAfterEnv: ['<rootDir>/src/testing/setup-tests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/core',
  preset: '../../jest.preset.ts',
};
