// unfrotunately the test is not running because of some issues with the jest configuration that i am not able to fix by myself
// Setting up the test proved to be more difficult than I thought, I kept getting errors that I couldn't fix related to the 3rd party libraries used in the project
export {};
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@tests/(.*)$': '<rootDir>/src/tests/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '(assets|models|services)': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '/.(css|less|scss)$/': 'identity-obj-proxy'
  },
  resolver: undefined,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom'
};
