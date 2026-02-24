import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'build',
    sourcemap: mode === 'development',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip', 'framer-motion'],
          'vendor-forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'placeholder.svg'],
      manifest: {
        name: 'Nimesh Kulkarni Portfolio',
        short_name: 'Portfolio',
        description: 'DevOps Engineer Portfolio',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,ttf,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
