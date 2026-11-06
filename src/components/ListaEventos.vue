<script setup>
import { computed, ref, watch } from 'vue'
import { Search, X } from '@lucide/vue'
import TarjetaEvento from './TarjetaEvento.vue'
import { categorias } from '../data/eventos.js'

const props = defineProps({ eventos: { type: Array, required: true } })
defineEmits(['abrir'])

const POR_PAGINA = 12
const filtro = ref('Todos')
const busqueda = ref('')
const visibles = ref(POR_PAGINA)

const sinTildes = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const conteo = computed(() => {
  const c = { Todos: props.eventos.length }
  for (const e of props.eventos) c[e.categoria] = (c[e.categoria] || 0) + 1
  return c
})
const opciones = computed(() => ['Todos', ...categorias.filter((c) => conteo.value[c])])

const filtrados = computed(() => {
  const q = sinTildes(busqueda.value.trim())
  return props.eventos.filter(
    (e) =>
      (filtro.value === 'Todos' || e.categoria === filtro.value) &&
      (!q || sinTildes(`${e.titulo} ${e.resumen} ${e.sede || ''} ${e.categoria}`).includes(q)),
  )
})

watch([filtro, busqueda], () => (visibles.value = POR_PAGINA))

const totalFotos = computed(() => props.eventos.reduce((s, e) => s + e.medios.filter((m) => m.tipo === 'foto').length, 0))
</script>

<template>
  <section id="eventos" class="relative scroll-mt-20 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-2xl">
          <p class="font-titulo text-sm font-bold uppercase tracking-[0.2em] text-monte-600">Así vivimos la escuela</p>
          <h2 class="mt-2 font-titulo text-4xl font-extrabold leading-tight text-cielo-900 sm:text-5xl">Nuestros eventos</h2>
          <p class="mt-3 text-lg text-cielo-900/75">
            {{ eventos.length }} eventos y más de {{ Math.floor(totalFotos / 50) * 50 }} fotos de la vida en nuestras sedes. Toca un evento para ver todas sus fotos.
          </p>
        </div>
        <label class="relative block w-full lg:w-80">
          <span class="sr-only">Buscar un evento</span>
          <Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cielo-500" />
          <input
            v-model="busqueda"
            type="search"
            placeholder="Buscar evento…"
            class="w-full rounded-full border-2 border-cielo-100 bg-white py-3 pl-12 pr-11 font-semibold text-cielo-950 shadow-sm outline-none transition placeholder:text-cielo-400 focus:border-oro-400"
          />
          <button v-if="busqueda" type="button" class="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-cielo-500 hover:bg-cielo-50" aria-label="Borrar búsqueda" @click="busqueda = ''">
            <X class="h-4 w-4" />
          </button>
        </label>
      </div>

      <div class="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por categoría">
        <button
          v-for="c in opciones"
          :key="c"
          type="button"
          class="shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition"
          :class="filtro === c ? 'bg-cielo-900 text-white shadow-md' : 'bg-white text-cielo-800 ring-1 ring-cielo-100 hover:bg-oro-100'"
          :aria-pressed="filtro === c"
          @click="filtro = c"
        >
          {{ c }} <span class="ml-1 opacity-60">{{ conteo[c] }}</span>
        </button>
      </div>

      <div v-if="filtrados.length" class="mt-8 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TarjetaEvento v-for="e in filtrados.slice(0, visibles)" :key="e.id" :evento="e" @abrir="$emit('abrir', $event)" />
      </div>
      <p v-else class="mt-12 rounded-3xl bg-white p-10 text-center text-lg font-semibold text-cielo-700">
        No encontramos eventos con «{{ busqueda }}».
      </p>

      <div v-if="filtrados.length > visibles" class="mt-10 text-center">
        <button type="button" class="rounded-full bg-oro-400 px-8 py-3 font-extrabold text-cielo-950 shadow transition hover:bg-oro-300" @click="visibles += POR_PAGINA">
          Ver más eventos ({{ filtrados.length - visibles }})
        </button>
      </div>
    </div>
  </section>
</template>
