import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://cyberlifecoach.pro',
      // Since you have 80+ pages, ensure every URL path is listed here
      dynamicRoutes: [
        '/',
        '/about',
        '/services',
        '/contact',
        // Add the rest of your 80+ routes below
      ] 
    }),
  ],
})