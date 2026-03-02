import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://cyberlifecoach.pro',
      // ADD THIS LINE:
      outDir: 'dist', 
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/contact',
        // Add the rest of your 80+ routes below
      ] 
    }),
  ],
  // Ensure Vite is definitely outputting to 'dist'
  build: {
    outDir: 'dist',
  }
})