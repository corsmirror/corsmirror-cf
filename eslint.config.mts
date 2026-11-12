import eslint from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const gitignorePath = new URL('.gitignore', import.meta.url).pathname;

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  {
    files: ['**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      eslint,
      prettier,
    },

    extends: [eslint.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      parserOptions: {
        project: ['tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },

  {
    files: ['functions/**/*.ts', 'cypress/**/*.ts', 'cypress.config.ts'],

    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        project: ['cypress/tsconfig.json', 'functions/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
