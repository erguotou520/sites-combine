export function onClickOutside(el: HTMLElement | HTMLElement[], callback: () => void) {
  const elems = Array.isArray(el) ? el : [el]
  const handler = (e: Event) => {
    if (elems.every(elem => e.target !== elem && e.composedPath().includes(elem))) {
      callback()
    }
  }
  document.addEventListener('click', handler, { passive: false })
  return () => {
    document.removeEventListener('click', handler)
  }
}