<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, Images, MapPin, Pause, Play, Video, Volume2, VolumeX } from '@lucide/vue'
import { institucion } from '../data/institucion.js'
import { useDeslizar } from '../composables/useDeslizar.js'

const props = defineProps({
  fotos: { type: Array, required: true }, // [{ src, alt }]
  video: { type: Object, default: null }, // { src, poster, titulo }
  intervalo: { type: Number, default: 6000 },
})

const modo = ref('fotos') // 'fotos' | 'video'
const actual = ref(0)
const enPausa = ref(false)
const silenciado = ref(true)
const videoRef = ref(null)
let temporizador = null

const total = computed(() => props.fotos.length)

function ir(i) {
  actual.value = (i + total.value) % total.value
  reiniciar()
}
const siguiente = () => ir(actual.value + 1)
const anterior = () => ir(actual.value - 1)

function reiniciar() {
  clearInterval(temporizador)
  if (enPausa.value || modo.value !== 'fotos' || total.value < 2) return
  temporizador = setInterval(() => (actual.value = (actual.value + 1) % total.value), props.intervalo)
}

function alternarPausa() {
  enPausa.value = !enPausa.value
  reiniciar()
}

async function verVideo() {
  modo.value = 'video'
  reiniciar()
  await nextTick()
  videoRef.value?.play().catch(() => {})
}
function verFotos() {
  videoRef.value?.pause()
  modo.value = 'fotos'
  reiniciar()
}
function alternarSonido() {
  silenciado.value = !silenciado.value
  if (videoRef.value) videoRef.value.muted = silenciado.value
}

// Las fotos cercanas a la actual se cargan primero; el resto, cuando toque.
const cargadas = ref(new Set([0, 1]))
watch(actual, (i) => {
  cargadas.value = new Set([...cargadas.value, i, (i + 1) % total.value])
})

const gestos = useDeslizar({ alIzquierda: siguiente, alDerecha: anterior })

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) enPausa.value = true
  reiniciar()
})
onBeforeUnmount(() => clearInterval(temporizador))
</script>

<template>
  <section id="inicio" class="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-cielo-950 text-white" aria-label="Nuestra sede">
    <!-- Slider de fotos -->
    <div
      v-show="modo === 'fotos'"
      class="absolute inset-0 -z-10 touch-pan-y select-none"
      aria-roledescription="carrusel"
      @pointerdown="gestos.onPointerDown"
      @pointerup="gestos.onPointerUp"
      @pointercancel="gestos.onPointerCancel"
    >
      <figure
        v-for="(foto, i) in fotos"
        :key="foto.src"
        class="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
        :class="i === actual ? 'opacity-100' : 'opacity-0'"
        :aria-hidden="i !== actual"
      >
        <img
          v-if="cargadas.has(i)"
          :src="foto.src"
          :srcset="foto.movil ? `${foto.movil} 960w, ${foto.src} 1920w` : undefined"
          sizes="100vw"
          :alt="foto.alt"
          class="h-full w-full object-cover"
          :class="i === actual && !enPausa ? 'animate-acercar' : ''"
          :style="{ objectPosition: foto.posicion || 'center' }"
          draggable="false"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
        />
      </figure>
    </div>

    <!-- Video de la sede -->
    <div v-if="video && modo === 'video'" class="absolute inset-0 -z-10 overflow-hidden bg-black">
      <img :src="video.poster" alt="" class="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
      <video
        ref="videoRef"
        :src="video.src"
        :poster="video.poster"
        class="relative mx-auto h-full w-full object-contain"
        :muted="silenciado"
        autoplay
        loop
        playsinline
        preload="metadata"
      ></video>
    </div>

    <!-- Velo para que el texto se lea sobre cualquier foto -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t"
      :class="modo === 'fotos' ? 'from-cielo-950 via-cielo-950/45 to-cielo-950/30' : 'from-cielo-950/90 via-transparent to-transparent'"
    ></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2 bg-gradient-to-r from-oro-400 via-monte-500 to-cielo-500"></div>

    <div class="mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20">
      <p v-if="modo === 'video'" class="font-titulo text-2xl font-bold drop-shadow sm:text-3xl">{{ video.titulo }}</p>
      <div v-else class="max-w-3xl">
        <p class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold backdrop-blur">
          <MapPin class="h-4 w-4 text-oro-300" /> {{ institucion.lugar }}
        </p>
        <h1 class="font-titulo text-4xl font-extrabold leading-[1.05] drop-shadow-lg sm:text-6xl lg:text-7xl">
          Institución Educativa Rural <span class="text-oro-400">San Sebastián</span>
        </h1>
        <p class="mt-4 max-w-2xl text-lg font-semibold text-white/90 drop-shadow sm:text-xl">{{ institucion.frase }}</p>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a href="#eventos" class="rounded-full bg-oro-400 px-6 py-3 font-extrabold text-cielo-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-oro-300">
          Ver nuestros eventos
        </a>
        <template v-if="video">
          <button
            v-if="modo === 'fotos'"
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-bold backdrop-blur transition hover:bg-white/25"
            @click="verVideo"
          >
            <Video class="h-5 w-5" /> Ver video de la sede
          </button>
          <template v-else>
            <button type="button" class="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-bold backdrop-blur transition hover:bg-white/25" @click="verFotos">
              <Images class="h-5 w-5" /> Volver a las fotos
            </button>
            <button
              type="button"
              class="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25"
              :aria-label="silenciado ? 'Activar sonido' : 'Silenciar'"
              @click="alternarSonido"
            >
              <VolumeX v-if="silenciado" class="h-5 w-5" />
              <Volume2 v-else class="h-5 w-5" />
            </button>
          </template>
        </template>
      </div>

      <!-- Controles del slider -->
      <div v-if="modo === 'fotos' && total > 1" class="mt-10 flex items-center gap-3">
        <button type="button" class="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30" aria-label="Foto anterior" @click="anterior">
          <ChevronLeft class="h-5 w-5" />
        </button>
        <div class="flex flex-1 flex-wrap gap-1.5 sm:flex-none">
          <button
            v-for="(f, i) in fotos"
            :key="'p' + i"
            type="button"
            class="h-1.5 rounded-full transition-all"
            :class="i === actual ? 'w-8 bg-oro-400' : 'w-3 bg-white/40 hover:bg-white/70'"
            :aria-label="`Ver foto ${i + 1} de ${total}`"
            :aria-current="i === actual"
            @click="ir(i)"
          ></button>
        </div>
        <button type="button" class="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30" aria-label="Foto siguiente" @click="siguiente">
          <ChevronRight class="h-5 w-5" />
        </button>
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30"
          :aria-label="enPausa ? 'Reanudar slider' : 'Pausar slider'"
          @click="alternarPausa"
        >
          <Play v-if="enPausa" class="h-4 w-4" />
          <Pause v-else class="h-4 w-4" />
        </button>
        <p class="ml-auto hidden max-w-xs truncate text-right text-sm font-semibold text-white/75 sm:block">{{ fotos[actual]?.alt }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes acercar {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}
.animate-acercar {
  animation: acercar 9s ease-out forwards;
}
</style>
