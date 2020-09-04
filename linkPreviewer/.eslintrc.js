module.exports = {
  root: true,
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'no-nested-ternary': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    indent: [
      'error',
      2,
      { SwitchCase: 1, MemberExpression: 1, flatTernaryExpressions: false },
    ],
  },
  plugins: [],
  settings: {},
};
