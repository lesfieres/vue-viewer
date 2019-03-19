module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended', 'plugin:vue/strongly-recommended'],
  globals: {
    __static: true,
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 'off',
    // disabled because of prettier
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    // disabled because of vuetify
    'vue/component-name-in-template-casing': 'off',
    // other rules. TODO Check them!
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};