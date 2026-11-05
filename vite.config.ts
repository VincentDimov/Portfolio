import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import githubActivityPlugin from './scripts/github-dev-plugin.mjs'

export default defineConfig(({ mode }) => ({
  plugins: [react(), githubActivityPlugin(loadEnv(mode, '.', ''))],
}))
