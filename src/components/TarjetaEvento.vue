<script setup>
import { computed } from 'vue'
import { CalendarDays, Images, PlayCircle } from '@lucide/vue'
import { colorCategoria, formatoFecha } from '../data/eventos.js'

const props = defineProps({ evento: { type: Object, required: true } })
defineEmits(['abrir'])

const fotos = computed(() => props.evento.medios.filter((m) => m.tipo === 'foto'))
const tieneVideo = computed(() => props.evento.medios.some((m) => m.tipo === 'video'))
const vistaPrevia = computed(() => fotos.value.filter((f) => f.mini !== props.evento.portada.mini).slice(0, 3))
</script>

<template>
  <article class="group">
    <button
      type="button"
      class="block w-full overflow-hidden rounded-3xl bg-white text-left shadow-md shadow-cielo-900/10 ring-1 ring-cielo-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cielo-900/15 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-oro-400"
      :aria-label="`Ver el evento: ${evento.titulo}`"
      @click="$emit('abrir', evento)"
    >
      <div class="relative aspect-[4/5] overflow-hidden bg-cielo-100">
        <img
          :src="evento.portada.mini"
          :alt="evento.portada.alt"
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          :style="{ objectPosition: evento.portada.posicion || 'center' }"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-cielo-950/85 via-cielo-950/10 to-transparent"></div>

        <span class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold shadow" :class="colorCategoria(evento.categoria)">
          {{ evento.categoria }}
        </span>
        <span class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-cielo-950/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          <Images v-if="fotos.length" class="h-3.5 w-3.5" />
          <template v-if="fotos.length">{{ fotos.length }}</template>
          <PlayCircle v-if="tieneVideo" class="h-3.5 w-3.5" :class="fotos.length ? 'ml-1' : ''" />
          <template v-if="tieneVideo">Video</template>
        </span>

        <div class="absolute inset-x-0 bottom-0 p-4">
          <div v-if="vistaPrevia.length" class="mb-3 flex gap-1.5">
            <img
              v-for="f in vistaPrevia"
              :key="f.mini"
              :src="f.mini"
              alt=""
              loading="lazy"
              class="h-12 w-12 rounded-lg object-cover ring-2 ring-white/70"
            />
            <span v-if="fotos.length > vistaPrevia.length + 1" class="grid h-12 w-12 place-items-center rounded-lg bg-white/20 text-sm font-extrabold text-white ring-2 ring-white/40 backdrop-blur">
              +{{ fotos.length - vistaPrevia.length - 1 }}
            </span>
          </div>
          <h3 class="font-titulo text-xl font-bold leading-tight text-white drop-shadow sm:text-2xl">{{ evento.titulo }}</h3>
        </div>
      </div>

      <div class="space-y-2 p-4">
        <p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-cielo-700">
          <span class="inline-flex items-center gap-1.5"><CalendarDays class="h-4 w-4 text-monte-600" /> {{ formatoFecha(evento.fecha) }}</span>
          <span v-if="evento.sede" class="text-cielo-500">· {{ evento.sede }}</span>
        </p>
        <p class="line-clamp-2 text-[0.95rem] leading-snug text-cielo-900/80">{{ evento.resumen }}</p>
      </div>
    </button>
  </article>
</template>
