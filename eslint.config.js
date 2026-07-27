import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['*.config.js'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Build tool configs (vite.config.js, tailwind.config.js, postcss.config.js,
    // this file) run under Node, not the browser — they need `process`, `module`,
    // `__dirname`, etc. instead of `window`/`document`.
    files: ['*.config.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
])
