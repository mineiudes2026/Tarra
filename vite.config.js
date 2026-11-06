import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Los encabezados de seguridad viven en vercel.json; `npm run preview` usa los mismos
// para detectar antes de publicar si algo (p. ej. el reproductor de TikTok) queda bloqueado.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const encabezados = Object.fromEntries(vercel.headers.find((h) => h.source === '/(.*)').headers.map((h) => [h.key, h.value]))

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: { port: 5190 },
  preview: { port: 5191, headers: encabezados },
})
