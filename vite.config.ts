import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/\/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) return 'react-vendor'
          if (/\/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion-vendor'
          if (id.includes('/node_modules/gsap/')) return 'gsap-vendor'
          if (id.includes('/node_modules/lucide-react/')) return 'icons-vendor'
        },
      },
    },
  },
})