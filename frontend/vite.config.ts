import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const backendUrl = process.env.VITE_BACKEND_URL
  console.log('Backend URL:', backendUrl)
  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },
    server: {
      port: 3000,
      host: !isDev,  // only needed in docker
      proxy: {
        '/api': {
          target: isDev ? `${backendUrl}/api` : backendUrl,
          changeOrigin: true,
        credentials: 'include',
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/media': {
          target: backendUrl,
          credentials: 'include',
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})