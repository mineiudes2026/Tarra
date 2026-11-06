// Detecta deslizamientos horizontales con el dedo (o el mouse) sobre un elemento.
export function useDeslizar({ alIzquierda, alDerecha, umbral = 45 }) {
  let inicioX = null
  let inicioY = null

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    inicioX = e.clientX
    inicioY = e.clientY
  }

  function onPointerUp(e) {
    if (inicioX === null) return
    const dx = e.clientX - inicioX
    const dy = e.clientY - inicioY
    inicioX = inicioY = null
    if (Math.abs(dx) < umbral || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) alIzquierda?.()
    else alDerecha?.()
  }

  function onPointerCancel() {
    inicioX = inicioY = null
  }

  return { onPointerDown, onPointerUp, onPointerCancel }
}
