module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/table-v1.vue',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'vue', 'json'],
};
