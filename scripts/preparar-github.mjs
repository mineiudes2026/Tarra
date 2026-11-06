// Deja en subir-a-github/ solo lo que Vercel necesita para publicar, con menos de 100
// archivos, para subirlo arrastrando la carpeta en la web de GitHub.
// Las fotos de public/media van empacadas en medios/medios-N.tar (≤ 20 MB cada uno);
// Vercel las desempaqueta solas antes de compilar.
// Ejecutar con: npm run preparar:github

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const origen = fileURLToPath(new URL('..', import.meta.url))
const CARPETA = 'subir-a-github'
const destino = join(origen, CARPETA)
const MARCA = '.carpeta-generada'
const EXCLUIR = new Set(['node_modules', 'dist', '.git', '.claude', '.vercel', 'medios', CARPETA, MARCA])
const MEDIA = join(origen, 'public', 'media')

// Solo se borra la carpeta si la creó este mismo script (o si quedó vacía).
if (existsSync(destino)) {
  if (!existsSync(join(destino, MARCA)) && readdirSync(destino).length) {
    console.error(`✖ ${destino} ya existe y no la creó este script. Bórrala o renómbrala tú primero.`)
    process.exit(1)
  }
  rmSync(destino, { recursive: true })
}
mkdirSync(destino)
writeFileSync(join(destino, MARCA), 'Carpeta generada por npm run preparar:github. No la edites: se reemplaza completa.\n')

// Se copia elemento por elemento: la carpeta destino está dentro del proyecto y
// Node no permite copiar una carpeta dentro de sí misma de un solo golpe.
for (const nombre of readdirSync(origen)) {
  if (EXCLUIR.has(nombre) || /^\.env/.test(nombre)) continue
  cpSync(join(origen, nombre), join(destino, nombre), { recursive: true, filter: (ruta) => !ruta.startsWith(MEDIA) })
}
execFileSync(process.execPath, [join(origen, 'scripts', 'medios.mjs'), 'empacar', join(destino, 'medios')], { stdio: 'inherit' })

// En esta copia los paquetes sí deben subirse: se quita "medios" del .gitignore.
const ignorar = join(destino, '.gitignore')
if (existsSync(ignorar)) {
  writeFileSync(ignorar, readFileSync(ignorar, 'utf8').split(/\r?\n/).filter((l) => l.trim() !== 'medios').join('\n'))
}

function contar(dir) {
  return readdirSync(dir).reduce((n, f) => n + (statSync(join(dir, f)).isDirectory() ? contar(join(dir, f)) : 1), 0)
}
function mayor(dir) {
  return readdirSync(dir).reduce((m, f) => {
    const r = join(dir, f)
    return Math.max(m, statSync(r).isDirectory() ? mayor(r) : statSync(r).size)
  }, 0)
}
const total = contar(destino)
console.log(`✔ ${total} archivos listos en ${destino} (el más grande pesa ${(mayor(destino) / 1048576).toFixed(1)} MB)`)
if (total >= 100) console.log('  ⚠ La web de GitHub acepta menos de 100 archivos por subida: súbelos en dos tandas.')
