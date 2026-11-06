<script setup>
import { MapPin } from '@lucide/vue'
import IconoRed from './IconoRed.vue'
import { institucion } from '../data/institucion.js'
</script>

<template>
  <footer id="contacto" class="relative scroll-mt-20 overflow-hidden bg-cielo-950 text-white">
    <div class="h-2 bg-gradient-to-r from-oro-400 via-monte-500 to-cielo-500"></div>
    <!-- Montañas del escudo -->
    <svg class="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-monte-800/40" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
      <path fill="currentColor" d="M0 160V95l120-35 140 55 170-85 160 70 150-60 190 80 170-75 180 60 160-40v95z" />
    </svg>

    <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center">
      <img src="/media/logo.webp" alt="Escudo de la IER San Sebastián" class="h-28 w-28 rounded-full bg-white object-contain p-1 ring-4 ring-oro-400" loading="lazy" />
      <div>
        <p class="font-titulo text-2xl font-extrabold">{{ institucion.nombre }}</p>
        <p class="mt-1 font-bold text-oro-300">{{ institucion.lema }}</p>
        <p class="mt-3 inline-flex items-center gap-2 text-white/80"><MapPin class="h-4 w-4 text-monte-400" /> {{ institucion.lugar }}</p>
      </div>
      <div>
        <p class="mb-3 text-sm font-bold uppercase tracking-widest text-white/60">Síguenos</p>
        <ul class="flex flex-col gap-2">
          <li v-for="r in institucion.redes" :key="r.nombre">
            <a :href="r.url" target="_blank" rel="noopener" class="inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 font-bold transition hover:bg-oro-400 hover:text-cielo-950">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-white text-cielo-950"><IconoRed :red="r.nombre" class="h-5 w-5" /></span>
              {{ r.usuario }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <p class="relative border-t border-white/10 py-5 text-center text-sm text-white/60">
      Fotos y videos tomados de las redes oficiales de la institución.
    </p>
  </footer>
</template>
