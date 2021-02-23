import { defineComponent, ref } from 'vue'

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

    return () => (
      <iframe src={props.url} class="border-none" style={{
        display: visible.value ? 'block' : 'none'
      }} />
    )
  }
})