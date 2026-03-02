import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import myDynamicRoutes from './generate-routes.cjs' // Ensure the path is correct

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://cyberlifecoach.pro',
      outDir: 'dist', 
      // Use the imported variable here
      dynamicRoutes: myDynamicRoutes 
    }),
  ],
  build: {
    outDir: 'dist',
  }
})