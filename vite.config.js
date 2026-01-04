import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Estate-Agent-App/',
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})