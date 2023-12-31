module.exports = {
  extends: ['@antfu/eslint-config-react', '@unocss'],
  rules: {
    'no-console': 'off',
    'curly': 'off',
    'no-new-func': 0,
    'no-fallthrough': 'off',
    'n/prefer-global/process': 'off',
    'indent': 'off',
    'brace-style': 'off',
    'max-attributes-per-line': 'off',

    'promise/param-names': 'off',

    'jsdoc/check-alignment': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/brace-style': 'off',

    'html/singleline-max-attributes': 'off',

    '@stylistic/js/no-tabs': 'off',

    // 希望打开的
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'antfu/no-cjs-exports': 'off',

    // react
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
  },
}
