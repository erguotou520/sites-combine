import { read } from '@popperjs/core'
import { useScriptTag } from '@vueuse/core'
import { defineComponent, onBeforeUnmount, PropType, ref } from 'vue'
import Loading from '../assets/grid.svg'
import { Site } from '../types/data'

export default defineComponent({
  name: 'Site',
  props: {
    site: {
      type: Object as PropType<Site>,
      required: true
    }
  },
  setup(props) {
    const visible = ref(true)
    const ready = ref(false)
    const workerReady = ref(false)

    if (props.site.worker) {
      navigator.serviceWorker.register(`/worker/${props.site.worker}.js`).then(() => {
        console.log('install 1')
        workerReady.value = true
      })
    } else {
      workerReady.value = true
    }

    const onLoad = () => {
      ready.value = true
      // if (props.site.hack) {
      //   useScriptTag(`/hack/${props.site.hack}.js`)
      // }
    }

    return () => (
      <div class="relative">
        {workerReady.value && (
          <iframe
            src={props.site.url}
            class="w-full h-full border-none"
            {...(props.site.worker ? { [`data-${props.site.worker}`]: true } : {})}
            onLoad={onLoad}
            style={{
              display: visible.value ? 'block' : 'none'
            }}
          />
        )}
        {!ready.value && (
          <img class="absolute left-1/2 top-1/2 z-10 w-12 h-12 -translate-x-1/2 -translate-y-1/2" src={Loading} />
        )}
      </div>
    )
  }
})
