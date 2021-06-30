import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      'marketing-ui': path.resolve(__dirname, 'es')
    }
  }
})
