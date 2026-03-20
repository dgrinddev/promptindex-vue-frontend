import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  /**
   * Vite command values:
   * - 'serve' → Development mode (`npm run dev` → "vite")
   * - 'build' → Production build (`npm run build` / `npm run build-only` → "vite build")
   */
  const isDev = command === 'serve'
  //const isBuild = command === 'build'

  // Plugins that are always enabled
  const basePlugins = [
    vue(),
    tailwindcss(),
  ]

  // Dev-only plugins
  const devPlugins = [
    vueDevTools(),
  ]

  // Build-only plugins
  //const buildPlugins = []

  return {
    plugins: [
      ...basePlugins,
      ...(isDev ? devPlugins : []),
      //...(isBuild ? buildPlugins : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: '127.0.0.1',
      port: 3000,
    },
  }
})