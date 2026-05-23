import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      '*.log',
      '.vscode/',
      '.idea/',
      'public/',
    ],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: { prettier },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error', // 👈 关键！Prettier 错误变成 ESLint 错误
    },
  },

  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: { jsx: true },
      },
    },
  },

  {
    rules: {
      // ESLint
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
]
