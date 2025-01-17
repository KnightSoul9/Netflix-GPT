import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Ensures the server binds to localhost
    port: 5173, // Specify the port explicitly
    strictPort: true, // Fails if the port is not available
    hmr: {
      protocol: 'ws', // Use WebSocket (default)
      host: 'localhost', // Match the development server host
      port: 5173, // Ensure HMR runs on the same port
    },
    cors: true, // Enable CORS for APIs or external requests
  },
  build: {
    outDir: 'dist', // Output directory for production builds
    sourcemap: true, // Includes sourcemaps for debugging production builds
  },
  resolve: {
    alias: {
      '@': '/src', // Simplifies imports like "@/components/Example"
    },
  },
})
