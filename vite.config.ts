import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts' // 追加
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/hoge?param=user': 'http://localhost:5001',
    }
  },
  plugins: [
    vue(),
    VitePluginFonts({
      // google: {
      //   families: [
      //     // ここに導入したいフォント名を入れる
      //     'Noto Sans JP, sans-serif'
      //   ],
      // }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
