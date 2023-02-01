import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'MARVEL SNAP ZONE',
        short_name: 'SNAP ZONE',
        description: 'marvel snap zone',
        display: 'standalone',
        theme_color: '#14171b',
        background_color: '#14171b',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    UnoCSS({
      rules: [['text-gray', { color: '#b0bac5' }]],
    }),
  ],
});
