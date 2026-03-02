import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
const myDynamicRoutes = require('./generate-routes.js'); // Import the script

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://cyberlifecoach.pro',
      outDir: 'dist', 
      dynamicRoutes: myDynamicRoutes // Automatically uses the 80+ detected routes
    }),
  ],
})