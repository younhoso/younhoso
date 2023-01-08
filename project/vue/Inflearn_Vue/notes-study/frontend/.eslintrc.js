module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    // vue
    'plugin:vue/vue3-strongly-recommended',
    // js
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-console": "off",
    "no-undef": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/component-definition-name-casing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multi-word-component-names": "off"
  }
}