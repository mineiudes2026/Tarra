<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink, MapPin, PlayCircle, X } from '@lucide/vue'
import { colorCategoria, formatoFecha } from '../data/eventos.js'
import { useDeslizar } from '../composables/useDeslizar.js'

const props = defineProps({ evento: { type: Object, required: true } })
const emit = defineEmits(['cerrar'])

const actual = ref(0)
const videosActivos = ref(new Set()) // videos de TikTok que el usuario ya pidió reproducir
const raizRef = ref(null)
const tirasRef = ref(null)

const medios = computed(() => props.evento.medios)
const total = computed(() => medios.value.length)
const medio = computed(() => medios.value[actual.value])
const numFotos = computed(() => medios.value.filter((m) => m.tipo === 'foto').length)
const numVideos = computed(() => medios.value.filter((m) => m.tipo === 'video').length)

function ir(i) {
  actual.value = (i + total.value) % total.value
}
const siguiente = () => ir(actual.value + 1)
const anterior = () => ir(actual.value - 1)

function activarVideo(id) {
  videosActivos.value = new Set([...videosActivos.value, id])
}

// El reproductor de TikTok solo se carga cuando la persona lo pide y mientras su diapositiva está a la vista.
function urlTiktok(id) {
  return `https://www.tiktok.com/player/v1/${id}?autoplay=1&music_info=0&description=0&rel=0&native_context_menu=0&closed_caption=1`
}

const gestos = useDeslizar({ alIzquierda: siguiente, alDerecha: anterior })

function alTeclado(e) {
  if (e.key === 'Escape') emit('cerrar')
  else if (e.key === 'ArrowRight') siguiente()
  else if (e.key === 'ArrowLeft') anterior()
}

// Mantiene a la vista la miniatura activa.
watch(actual, async (i) => {
  await nextTick()
  tirasRef.value?.querySelector(`[data-i="${i}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
})

// Precarga la foto anterior y la siguiente para que el paso sea instantáneo.
watch(
  actual,
  (i) => {
    for (const j of [i + 1, i - 1]) {
      const m = medios.value[(j + total.value) % total.value]
      if (m?.tipo === 'foto') new Image().src = m.src
    }
  },
  { immediate: true },
)

let enfoquePrevio = null
onMounted(() => {
  enfoquePrevio = document.activeElement
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('keydown', alTeclado)
  raizRef.value?.focus()
})
onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', alTeclado)
  enfoquePrevio?.focus?.()
})
</script>

<template>
  <div ref="raizRef" tabindex="-1" class="fixed inset-0 z-50 flex bg-cielo-950/95 outline-none backdrop-blur-sm" role="dialog" aria-modal="true" :aria-label="evento.titulo">
    <div class="flex h-full w-full flex-col lg:flex-row">
      <!-- Escenario de fotos -->
      <div class="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div class="flex items-center justify-between gap-3 px-4 py-3 text-white lg:hidden">
          <p class="truncate font-titulo text-lg font-bold">{{ evento.titulo }}</p>
          <button type="button" class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Cerrar" @click="$emit('cerrar')">
            <X class="h-5 w-5" />
          </button>
        </div>

        <div
          class="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-2 sm:px-16"
          @pointerdown="gestos.onPointerDown"
          @pointerup="gestos.onPointerUp"
          @pointercancel="gestos.onPointerCancel"
        >
          <template v-if="medio.tipo === 'foto'">
            <img :key="medio.src" :src="medio.src" :alt="medio.alt" class="visor-entrada max-h-full max-w-full rounded-xl object-contain shadow-2xl" draggable="false" />
          </template>
          <template v-else>
            <div :key="medio.tiktok" class="visor-entrada relative aspect-[9/16] h-full max-h-[78svh] overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                v-if="videosActivos.has(medio.tiktok)"
                :src="urlTiktok(medio.tiktok)"
                class="h-full w-full"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                :title="`Video de TikTok: ${evento.titulo}`"
              ></iframe>
              <button v-else type="button" class="group/v absolute inset-0" :aria-label="`Reproducir video: ${evento.titulo}`" @click="activarVideo(medio.tiktok)">
                <img :src="medio.poster" alt="" class="h-full w-full object-cover opacity-80 transition group-hover/v:opacity-100" />
                <span class="absolute inset-0 grid place-items-center">
                  <span class="flex flex-col items-center gap-2 text-white">
                    <PlayCircle class="h-20 w-20 drop-shadow-lg transition group-hover/v:scale-110" />
                    <span class="rounded-full bg-black/60 px-4 py-1.5 text-sm font-bold">Ver video</span>
                  </span>
                </span>
              </button>
            </div>
          </template>

          <button
            v-if="total > 1"
            type="button"
            class="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-oro-400 hover:text-cielo-950 sm:left-4"
            aria-label="Anterior"
            @click="anterior"
          >
            <ChevronLeft class="h-6 w-6" />
          </button>
          <button
            v-if="total > 1"
            type="button"
            class="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-oro-400 hover:text-cielo-950 sm:right-4"
            aria-label="Siguiente"
            @click="siguiente"
          >
            <ChevronRight class="h-6 w-6" />
          </button>
          <span class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm font-bold text-white">{{ actual + 1 }} / {{ total }}</span>
        </div>

        <!-- Tira de miniaturas -->
        <div ref="tirasRef" class="flex shrink-0 gap-2 overflow-x-auto px-4 pb-4 pt-3 [scrollbar-width:thin]">
          <button
            v-for="(m, i) in medios"
            :key="i"
            type="button"
            :data-i="i"
            class="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-16"
            :class="i === actual ? 'ring-oro-400' : 'opacity-60 ring-transparent hover:opacity-100'"
            :aria-label="m.tipo === 'video' ? `Video ${i + 1}` : `Foto ${i + 1}`"
            :aria-current="i === actual"
            @click="ir(i)"
          >
            <img :src="m.tipo === 'video' ? m.poster : m.mini" alt="" loading="lazy" class="h-full w-full object-cover" />
            <span v-if="m.tipo === 'video'" class="absolute inset-0 grid place-items-center bg-black/30 text-white"><PlayCircle class="h-6 w-6" /></span>
          </button>
        </div>
      </div>

      <!-- Información del evento -->
      <aside class="max-h-[32svh] shrink-0 overflow-y-auto bg-white p-5 text-cielo-950 sm:p-6 lg:max-h-none lg:w-[400px] lg:p-8">
        <div class="mb-4 hidden justify-end lg:flex">
          <button type="button" class="grid h-11 w-11 place-items-center rounded-full bg-cielo-50 text-cielo-900 transition hover:bg-oro-400" aria-label="Cerrar" @click="$emit('cerrar')">
            <X class="h-5 w-5" />
          </button>
        </div>
        <span class="inline-block rounded-full px-3 py-1 text-xs font-extrabold" :class="colorCategoria(evento.categoria)">{{ evento.categoria }}</span>
        <h2 class="mt-3 font-titulo text-2xl font-extrabold leading-tight text-cielo-900 sm:text-3xl">{{ evento.titulo }}</h2>
        <p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-cielo-700">
          <span class="inline-flex items-center gap-1.5"><CalendarDays class="h-4 w-4 text-monte-600" /> {{ formatoFecha(evento.fecha, true) }}</span>
          <span v-if="evento.sede" class="inline-flex items-center gap-1.5"><MapPin class="h-4 w-4 text-monte-600" /> {{ evento.sede }}</span>
        </p>
        <p class="mt-4 leading-relaxed text-cielo-900/85">{{ evento.descripcion }}</p>
        <p class="mt-4 text-sm font-semibold text-cielo-600">
          {{ numFotos }} {{ numFotos === 1 ? 'foto' : 'fotos' }}<template v-if="numVideos"> · {{ numVideos }} {{ numVideos === 1 ? 'video' : 'videos' }}</template>
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <a
            v-for="(url, i) in evento.enlaces"
            :key="url"
            :href="url"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 rounded-full bg-cielo-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-cielo-700"
          >
            Ver en TikTok<template v-if="evento.enlaces.length > 1"> ({{ i + 1 }})</template> <ExternalLink class="h-4 w-4" />
          </a>
        </div>
      </aside>
    </div>

  </div>
</template>

<style scoped>
@keyframes entrada {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: scale(1); }
}
.visor-entrada {
  animation: entrada 0.35s ease-out;
}
</style>
