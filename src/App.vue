<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import EncabezadoSitio from './components/EncabezadoSitio.vue'
import PortadaSede from './components/PortadaSede.vue'
import ListaEventos from './components/ListaEventos.vue'
import VisorEvento from './components/VisorEvento.vue'
import PieSitio from './components/PieSitio.vue'
import { eventos, slider, videoSede } from './data/eventos.js'

// El evento abierto queda en la dirección (#evento/<id>) para poder compartirlo.
const abierto = ref(null)
const PREFIJO = '#evento/'

function leerDireccion() {
  const id = location.hash.startsWith(PREFIJO) ? decodeURIComponent(location.hash.slice(PREFIJO.length)) : null
  abierto.value = eventos.find((e) => e.id === id) || null
}

function abrir(evento) {
  history.pushState(null, '', PREFIJO + evento.id)
  abierto.value = evento
}

function cerrar() {
  if (location.hash.startsWith(PREFIJO)) history.replaceState(null, '', '#eventos')
  abierto.value = null
}

onMounted(() => {
  leerDireccion()
  window.addEventListener('popstate', leerDireccion)
})
onBeforeUnmount(() => window.removeEventListener('popstate', leerDireccion))
</script>

<template>
  <EncabezadoSitio />
  <main>
    <PortadaSede :fotos="slider" :video="videoSede" />
    <ListaEventos :eventos="eventos" @abrir="abrir" />
  </main>
  <PieSitio />
  <Transition name="visor">
    <VisorEvento v-if="abierto" :key="abierto.id" :evento="abierto" @cerrar="cerrar" />
  </Transition>
</template>

<style>
.visor-enter-active,
.visor-leave-active {
  transition: opacity 0.25s ease;
}
.visor-enter-from,
.visor-leave-to {
  opacity: 0;
}
</style>
