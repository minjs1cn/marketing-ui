import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
console.log(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development'

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
      'marketing-ui': path.resolve(__dirname, 'es'),
    }
  },
  base: '/marketing-ui/demo'
})
