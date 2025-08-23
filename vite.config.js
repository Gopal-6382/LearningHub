import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // exposes your dev server to your LAN
    port: 1000,  // default Vite port; you can change it
  }
})
