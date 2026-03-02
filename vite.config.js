import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import myDynamicRoutes from './generate-routes.js' // The file we just edited

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://cyberlifecoach.pro',
      outDir: 'dist', 
      dynamicRoutes: myDynamicRoutes // This array is now handled by your script
    }),
  ],
  build: {
    outDir: 'dist',
  }
})