module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    // Regras do ESLint
    'no-console': 'warn',
    'no-debugger': 'warn',

    // Regras do TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // Regras do Prettier
    'prettier/prettier': 'error',
  },
};
