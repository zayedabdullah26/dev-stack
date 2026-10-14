import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dev-stack/', // আপনার GitHub রিপোজিটরির নাম অনুযায়ী যুক্ত করা হয়েছে
})
