// Empaqueta y desempaqueta las fotos de public/media en pocos archivos .tar.
//
// Sirve para subir el proyecto por la web de GitHub, que acepta menos de 100 archivos
// por subida y 25 MB por archivo: las ~950 fotos viajan en unos pocos paquetes de ≤ 20 MB
// y Vercel los desempaqueta antes de compilar (script "prebuild" de package.json).
//
//   node scripts/medios.mjs empacar <carpeta-destino>   → crea medios-1.tar, medios-2.tar…
//   node scripts/medios.mjs desempacar                  → si existe ./medios/*.tar, los extrae en public/
//
// Si el proyecto se sube con git (public/media incluido), no hay paquetes y "desempacar" no hace nada.

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = fileURLToPath(new URL('..', import.meta.url))
const PUBLICO = join(RAIZ, 'public')
const MEDIA = join(PUBLICO, 'media')
const PAQUETES = join(RAIZ, 'medios')
const TOPE = 20 * 1024 * 1024
const BLOQUE = 512

function listar(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listar(join(dir, e.name)) : [join(dir, e.name)],
  )
}

// Encabezado ustar mínimo (nombres de hasta 100 caracteres, que es lo que usamos).
function encabezado(nombre, tam) {
  const h = Buffer.alloc(BLOQUE)
  if (Buffer.byteLength(nombre) > 100) throw new Error(`Nombre demasiado largo para el paquete: ${nombre}`)
  h.write(nombre, 0, 100, 'utf8')
  h.write('0000644\0', 100)
  h.write('0000000\0', 108)
  h.write('0000000\0', 116)
  h.write(tam.toString(8).padStart(11, '0') + '\0', 124)
  h.write(Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0', 136)
  h.write('        ', 148)
  h.write('0', 156)
  h.write('ustar\0', 257)
  h.write('00', 263)
  let suma = 0
  for (const b of h) suma += b
  h.write(suma.toString(8).padStart(6, '0') + '\0 ', 148)
  return h
}

const relleno = (tam) => Buffer.alloc((BLOQUE - (tam % BLOQUE)) % BLOQUE)

function empacar(destino) {
  if (!existsSync(MEDIA)) throw new Error(`No existe ${MEDIA}`)
  mkdirSync(destino, { recursive: true })
  const archivos = listar(MEDIA).sort()
  const paquetes = []
  let actual = []
  let tam = 0
  for (const ruta of archivos) {
    const peso = statSync(ruta).size + 2 * BLOQUE
    if (actual.length && tam + peso > TOPE) {
      paquetes.push(actual)
      actual = []
      tam = 0
    }
    actual.push(ruta)
    tam += peso
  }
  if (actual.length) paquetes.push(actual)

  paquetes.forEach((grupo, i) => {
    const partes = []
    for (const ruta of grupo) {
      const datos = readFileSync(ruta)
      const nombre = relative(PUBLICO, ruta).split(sep).join('/')
      partes.push(encabezado(nombre, datos.length), datos, relleno(datos.length))
    }
    partes.push(Buffer.alloc(BLOQUE * 2))
    writeFileSync(join(destino, `medios-${i + 1}.tar`), Buffer.concat(partes))
  })
  console.log(`✔ ${archivos.length} fotos y videos empacados en ${paquetes.length} paquetes (${destino})`)
}

function desempacar() {
  if (!existsSync(PAQUETES)) return console.log('· Sin paquetes de medios: se usan las fotos de public/media.')
  const tars = readdirSync(PAQUETES).filter((f) => f.endsWith('.tar')).sort()
  let total = 0
  for (const tar of tars) {
    const buf = readFileSync(join(PAQUETES, tar))
    let pos = 0
    while (pos + BLOQUE <= buf.length) {
      const h = buf.subarray(pos, pos + BLOQUE)
      if (h.every((b) => b === 0)) break
      const nombre = h.subarray(0, 100).toString('utf8').replace(/\0.*$/s, '')
      const tam = parseInt(h.subarray(124, 136).toString('utf8').replace(/\0.*$/s, '').trim(), 8)
      const tipo = String.fromCharCode(h[156])
      pos += BLOQUE
      if ((tipo === '0' || tipo === '\0') && nombre && !nombre.includes('..')) {
        const destino = join(PUBLICO, nombre)
        mkdirSync(dirname(destino), { recursive: true })
        writeFileSync(destino, buf.subarray(pos, pos + tam))
        total++
      }
      pos += Math.ceil(tam / BLOQUE) * BLOQUE
    }
  }
  console.log(`✔ ${total} archivos desempacados de ${tars.length} paquetes en public/media`)
}

const [orden, destino] = process.argv.slice(2)
if (orden === 'empacar') empacar(destino || PAQUETES)
else if (orden === 'desempacar') desempacar()
else {
  console.error('Uso: node scripts/medios.mjs empacar <carpeta> | desempacar')
  process.exit(1)
}
