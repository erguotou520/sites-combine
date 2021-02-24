import { read } from '@popperjs/core'
import { defineComponent, ref } from 'vue'
import Loading from '../assets/grid.svg'

export default defineComponent({
  name: 'Site',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const visible = ref(true)
    const ready = ref(false)

    return () => (
      <div class="relative">
        <iframe src={props.url} class="w-full h-full border-none" onLoad={() => ready.value = true } style={{
          display: visible.value ? 'block' : 'none'
        }} />
        {!ready.value && <img class="absolute left-1/2 top-1/2 z-10 w-12 h-12 -translate-x-1/2 -translate-y-1/2" src={Loading} />}
      </div>
    )
  }
})