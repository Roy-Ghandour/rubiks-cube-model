// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname, // must be a string, not URL
  recommendedConfig: 'eslint/conf/eslint-recommended',
});

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/__tests__/**/*.ts'],
    ignores: ['dist/**', 'node_modules/**'],

    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },

  // extend recommended configs
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('prettier'),
];
