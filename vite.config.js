import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import myDynamicRoutes from './generate-routes.cjs'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://cyberlifecoach.pro',
      outDir: 'dist',
      dynamicRoutes: myDynamicRoutes
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react-dom')) return 'react-dom'
          if (id.includes('node_modules/react')) return 'react'
          if (id.includes('node_modules/react-router-dom')) return 'router'
        }
      }
    }
  }
})