import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/iconSvg')],
      symbolId: 'icon-[name]',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'faw.ssnj.com',
      '.ssnj.com'  // 允许所有 ssnj.com 子域名
    ],
    // proxy: {
    //   '/api': {
    //     target: 'http://faw.ssnj.com',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
