<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { institucion } from '../data/institucion.js'

const abierto = ref(false)
const conFondo = ref(false)

const enlaces = [
  { texto: 'Inicio', href: '#inicio' },
  { texto: 'Eventos', href: '#eventos' },
  { texto: 'Contacto', href: '#contacto' },
]

function alDesplazar() {
  conFondo.value = window.scrollY > 40
}
onMounted(() => {
  alDesplazar()
  window.addEventListener('scroll', alDesplazar, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', alDesplazar))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-300"
    :class="conFondo || abierto ? 'bg-cielo-950/90 shadow-lg shadow-cielo-950/20 backdrop-blur' : 'bg-gradient-to-b from-cielo-950/70 to-transparent'"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
      <a href="#inicio" class="flex min-w-0 items-center gap-3" @click="abierto = false">
        <img src="/media/logo.webp" alt="Escudo de la IER San Sebastián" class="h-11 w-11 shrink-0 rounded-full bg-white object-contain p-0.5 ring-2 ring-oro-400 sm:h-14 sm:w-14" />
        <span class="min-w-0 leading-tight">
          <span class="block truncate font-titulo text-lg font-bold text-white sm:text-xl">{{ institucion.corto }}</span>
          <span class="block truncate text-xs font-semibold text-oro-300 sm:text-sm">{{ institucion.lema }}</span>
        </span>
      </a>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Principal">
        <a
          v-for="e in enlaces"
          :key="e.href"
          :href="e.href"
          class="rounded-full px-4 py-2 text-sm font-bold text-white/90 transition hover:bg-white/10 hover:text-white"
          >{{ e.texto }}</a
        >
        <a href="#eventos" class="ml-2 rounded-full bg-oro-400 px-5 py-2 text-sm font-extrabold text-cielo-950 shadow transition hover:bg-oro-300">
          Ver eventos
        </a>
      </nav>

      <button
        type="button"
        class="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
        :aria-expanded="abierto"
        aria-controls="menu-movil"
        :aria-label="abierto ? 'Cerrar menú' : 'Abrir menú'"
        @click="abierto = !abierto"
      >
        <X v-if="abierto" class="h-6 w-6" />
        <Menu v-else class="h-6 w-6" />
      </button>
    </div>

    <nav v-show="abierto" id="menu-movil" class="border-t border-white/10 px-4 pb-4 md:hidden" aria-label="Menú móvil">
      <a
        v-for="e in enlaces"
        :key="e.href"
        :href="e.href"
        class="block rounded-xl px-4 py-3 font-bold text-white hover:bg-white/10"
        @click="abierto = false"
        >{{ e.texto }}</a
      >
    </nav>
  </header>
</template>
