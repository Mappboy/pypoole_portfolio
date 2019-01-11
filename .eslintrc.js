module.exports = {
  extends: ['airbnb', 'prettier',
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:jsx-a11y/recommended"],
  plugins: ["prettier", "jsx-a11y"],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    'react/require-default-props': 'off',
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true

  },
};
