import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

// Explicitly read in your Prettier config
const prettierConfigPath = path.resolve(__dirname, '.prettierrc.yaml');
const prettierConfig = fs.existsSync(prettierConfigPath)
  ? yaml.parse(fs.readFileSync(prettierConfigPath, 'utf8'))
  : {};

export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      semi: ['error', 'always'],
      '@typescript-eslint/semi': 'off',

      // Use the explicitly loaded config
      'prettier/prettier': ['error', prettierConfig],
    }
  },
  eslintConfigPrettier
)
