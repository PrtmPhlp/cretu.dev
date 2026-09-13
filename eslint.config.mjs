import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import importPlugin from 'eslint-plugin-import';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores([
    'coverage/',
    'dist/',
    '.contentlayer/',
    'data/',
    'node_modules/',
    '.next/',
  ]),
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  // eslint-config-next already registers the `import`, `react`, `react-hooks`
  // and `@typescript-eslint` plugins (and applies react/react-hooks recommended
  // rules), so only rules are added on top of it below.
  // Its default file pattern misses `.cjs` (e.g. prettier.config.cjs), which
  // would otherwise be linted with the rules below but without the plugins.
  // `fixupPluginRules` polyfills context APIs (getFilename, getSourceCode, …)
  // that ESLint 10 removed but eslint-plugin-react still relies on.
  ...nextCoreWebVitals.map((config) =>
    config.name === 'next'
      ? {
          ...config,
          files: [...config.files, '**/*.cjs'],
          plugins: {
            ...config.plugins,
            react: fixupPluginRules(config.plugins.react),
          },
        }
      : config,
  ),
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'sort-keys-fix': fixupPluginRules(sortKeysFix),
      'typescript-sort-keys': fixupPluginRules(typescriptSortKeys),
      unicorn,
    },
    rules: {
      // plugin:import/errors (+ plugin:import/typescript turns `named` off)
      ...importPlugin.flatConfigs.errors.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-unused-vars': ['error'],
      'array-bracket-spacing': [2, 'never'],
      'arrow-parens': [2, 'always'],
      'arrow-spacing': 2,
      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'eol-last': 2,
      // `import/default` and `import/namespace` are slow.
      'import/default': 0,
      'import/namespace': 0,
      'import/no-duplicates': 2,
      'import/no-extraneous-dependencies': [2],
      'import/no-namespace': 2,
      'import/order': 0,
      'no-console': 0,
      'no-const-assign': 2,
      'no-extra-parens': [2, 'functions'],
      'no-irregular-whitespace': 2,
      'no-this-before-super': 2,
      'no-unused-expressions': 2,
      'no-unused-labels': 1,
      'no-unused-vars': 0,
      'no-var': 2,
      'object-curly-spacing': 0,
      'object-shorthand': 2,
      'prefer-arrow-callback': 2,
      'prefer-const': 2,
      'react-hooks/exhaustive-deps': 2,
      'react/jsx-sort-props': 2,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      semi: [2, 'always'],
      'sort-keys-fix/sort-keys-fix': 2,
      'space-before-blocks': 2,
      'space-before-function-paren': [
        2,
        { anonymous: 'never', asyncArrow: 'always', named: 'never' },
      ],
      'typescript-sort-keys/interface': 2,
      'typescript-sort-keys/string-enum': 2,
      'unicorn/catch-error-name': 2,
      'unicorn/consistent-function-scoping': 2,
      'unicorn/no-abusive-eslint-disable': 2,
      'unicorn/no-useless-promise-resolve-reject': 2,
      'unicorn/no-useless-spread': 2,
      'unicorn/numeric-separators-style': 2,
      'unicorn/prefer-array-flat-map': 2,
      'unicorn/prefer-array-index-of': 2,
      'unicorn/prefer-array-some': 2,
      'unicorn/prefer-at': 2,
      'unicorn/prefer-dom-node-append': 2,
      'unicorn/prefer-native-coercion-functions': 2,
      'unicorn/prefer-node-protocol': 2,
      'unicorn/prefer-number-properties': 2,
      'unicorn/prefer-optional-catch-binding': 2,
      'unicorn/prefer-string-replace-all': 2,
      'unicorn/prefer-string-slice': 2,
      'unicorn/prefer-ternary': 2,
      'unicorn/prefer-top-level-await': 2,
      'unicorn/text-encoding-identifier-case': 2,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'react/display-name': 0,
    },
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
]);
