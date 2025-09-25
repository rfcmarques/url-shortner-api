/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  // Use a preset that is specifically designed for TypeScript projects with ES Modules
  preset: 'ts-jest/presets/default-esm',

  // Specify the test environment
  testEnvironment: 'node',

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module.
  // This helps Jest resolve the '.js' extension in your import statements.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // A map from regular expressions to paths to transformers
  // This tells Jest to use ts-jest to transform your TypeScript files
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // This is the key part that tells ts-jest to use ES Modules!
      },
    ],
  },
};
