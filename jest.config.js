module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    preset: 'ts-jest',
    testRegex: '/e2e/.*\\.(spec).(ts|tsx|js)$',
    collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
    coverageReporters: ['json', 'lcov'],
    testEnvironment: 'node'
};
