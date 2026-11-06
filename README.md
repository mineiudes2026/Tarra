# Eventos · IER San Sebastián

Página de eventos de la **Institución Educativa Rural San Sebastián** (Hacarí, Norte de Santander), hecha con **Vue 3 + Tailwind CSS 4**.

- Portada con **slider de fotos de la sede** y botón para ver el **video de la sede**.
- **33 eventos** sacados del TikTok [@iersansebastian](https://www.tiktok.com/@iersansebastian) (solo eventos: sin cumpleaños, flyers ni invitaciones).
- Cada evento abre un **visor con todas sus fotos** (flechas, teclado, deslizar con el dedo, miniaturas) y sus videos de TikTok.
- Filtro por categoría, buscador y enlace directo a cada evento (`#evento/<id>`).
- Colores del escudo: dorado, azul cielo y verde montaña.

## Usar en este computador

```bash
npm install
npm run dev       # http://localhost:5190
npm run build     # genera dist/
npm run preview   # sirve dist/ con los mismos encabezados de Vercel (http://localhost:5191)
```

## Publicar en GitHub + Vercel

Vercel ya queda configurado con `vercel.json` (Vite, `npm ci`, `npm run build`, carpeta `dist`,
encabezados de seguridad y caché de fotos). Hay dos formas de subir el código:

### Opción A · con git (recomendada)

El repositorio ya está iniciado con su primer commit. Crea en GitHub un repositorio **vacío**
(sin README ni .gitignore) y ejecuta en esta carpeta:

```bash
git remote add origin https://github.com/<tu-usuario>/eventos-ier-sansebastian.git
git push -u origin main
```

### Opción B · arrastrando archivos en la web de GitHub

La web de GitHub acepta menos de 100 archivos por subida y la página tiene ~950 fotos, así que:

```bash
npm run preparar:github
```

Eso crea `subir-a-github/` con **27 archivos**: el código y las fotos empacadas en
`medios/medios-1.tar … medios-4.tar` (≤ 20 MB cada uno). Arrastra **el contenido** de esa
carpeta a la web de GitHub. Al compilar, Vercel desempaqueta las fotos solo (`prebuild`).

### En Vercel

**Add New… → Project → Import** el repositorio de GitHub → **Deploy** (no hay que cambiar
nada: Vercel lee `vercel.json`). Cada cambio que subas a GitHub se publica solo.

## Agregar o editar eventos

Todo está en `src/data/eventos.js` (instrucciones al inicio del archivo). Las fotos van en
`public/media/eventos/<id>/` (01.webp es la portada) con sus miniaturas en `mini/`.
Si subes por la web (opción B), vuelve a ejecutar `npm run preparar:github` después de cambiar fotos.
