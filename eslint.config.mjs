import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "build/**"
    ],
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: await import("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project: "./tsconfig.json"
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': ['warn'],
      'no-duplicate-case': 'warn',
      'no-template-curly-in-string': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'curly': ['warn', 'multi-line'],
      'eqeqeq': ['warn', 'smart'],
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-extra-semi': 'warn',
      'no-floating-decimal': 'warn',
      'no-lonely-if': 'warn',
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
      'no-unneeded-ternary': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-alert': 'warn',
      'array-bracket-spacing': ['warn', 'always'],
      'array-element-newline': ['warn', 'consistent'],
      'arrow-parens': ['warn', 'as-needed'],
      'arrow-spacing': 'warn',
      'block-spacing': 'warn',
      'brace-style': 'warn',
      'comma-dangle': ['warn', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      'comma-spacing': 'warn',
      'comma-style': 'warn',
      'computed-property-spacing': 'warn',
      'dot-location': ['warn', 'property'],
      'eol-last': 'warn',
      'func-call-spacing': 'warn',
      'key-spacing': 'warn',
      'keyword-spacing': 'warn',
      'jsx-quotes': ['warn', 'prefer-single'],
      'no-extra-parens': ['warn', 'all', { ignoreJSX: 'all' }],
      'no-multi-spaces': 'warn',
      'no-trailing-spaces': 'warn',
      'no-whitespace-before-property': 'warn',
      'no-multiple-empty-lines': ['warn', {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      }],
      'nonblock-statement-body-position': 'warn',
      'object-curly-newline': ['warn', {
        multiline: true,
        consistent: true,
      }],
      'object-curly-spacing': ['warn', 'always'],
      'operator-linebreak': 'warn',
      'quotes': ['warn', 'single'],
      'rest-spread-spacing': 'warn',
      'semi': ['warn', 'always'],
      'semi-spacing': 'warn',
      'semi-style': 'warn',
      'space-before-blocks': 'warn',
      'space-before-function-paren': ['warn', 'never'],
      'space-in-parens': 'warn',
      'space-infix-ops': ['error', { int32Hint: false }],
      'space-unary-ops': ['warn', {
        words: true,
        nonwords: false,
      }],
      'template-curly-spacing': 'warn',
      'max-len': ['warn', {
        code: 150,
        tabWidth: 4,
        comments: 100,
        ignoreUrls: true,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
      }],
      'max-lines': ['warn', {
        max: 300,
        skipComments: true,
      }],
      'max-statements-per-line': 'warn',
    },
  },
];

export default eslintConfig;
