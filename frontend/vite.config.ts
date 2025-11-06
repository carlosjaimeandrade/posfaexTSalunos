import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backend = process.env.BACKEND_URL || 'http://localhost:3000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': { target: backend, changeOrigin: true },
      '/user': { target: backend, changeOrigin: true },
      '/me': { target: backend, changeOrigin: true },
      '/product': { target: backend, changeOrigin: true },
      '/products': { target: backend, changeOrigin: true },
      '/order': { target: backend, changeOrigin: true }
    }
  }
})

