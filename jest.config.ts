export {};
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@tests/(.*)$': '<rootDir>/src/tests/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '(assets|models|services)': '<rootDir>/src/tests/__mocks__/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/tests/__mocks__/styleMock.ts',
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
