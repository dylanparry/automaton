module.exports = function wallabyConfig(wallaby)
{
  return {
    files: [
      'app/**/*.js',
      'app/**/*.jsx',
      '!tests/**/*.js',
      '!tests/**/*.jsx',
    ],

    tests: [
      'tests/**/*.js',
      'tests/**/*.jsx',
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.jsx': wallaby.compilers.babel(),
    },

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
  };
};
