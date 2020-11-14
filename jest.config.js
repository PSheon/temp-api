module.exports = {
  verbose: true,
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)(spec|test).js?(x)',
    '!**/config/**'
  ],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!jest.config.js',
    '!**/config/**',
    '!**/data/**',
    '!**/node_modules/**',
    '!**/.history/**',
    '!**/e2e/**',
    '!**/coverage/**',
    '!**/tmp/**'
  ],
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['json', 'text', 'lcov'],
  testPathIgnorePatterns: ['.history/']
}
