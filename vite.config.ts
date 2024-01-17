import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts' // 追加
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/hoge?param=user': 'http://localhost:5001'
    // }
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
    }),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      injectRegister: 'auto',
      manifest: {
        name: 'TODO App',
        short_name: 'TODO',
        description: 'resister your todo',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        lang: 'ja'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['workbox-window']
  }
})
