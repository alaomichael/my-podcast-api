module.exports = {
    preset: 'ts-jest', // Use ts-jest to handle TypeScript files
    testEnvironment: 'node', // Set the test environment to Node.js
    roots: ['<rootDir>/src'], // Look for test files in the src directory (replaces rootDir)
    moduleDirectories: ['node_modules', 'src'], // Allow Jest to resolve modules from src
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Map src/* imports to the src directory
    },
    testMatch: ['**/*.spec.ts'], // Match test files with .spec.ts extension (replaces testRegex)
    moduleFileExtensions: ['js', 'json', 'ts'], // Recognize these file extensions
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    collectCoverageFrom: ['**/*.(t|j)s'], // Collect coverage from these files
    coverageDirectory: '../coverage', // Store coverage reports in ../coverage
  };