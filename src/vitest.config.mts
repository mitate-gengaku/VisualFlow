import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths"
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      '@/src/': path.resolve(__dirname),
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/__test__/setup/setup.ts"
  },
})