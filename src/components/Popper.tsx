import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { createPopper, Instance } from '@popperjs/core'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'Popper',
  props: {
    defaultVisible: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String
    }
  },
  setup(props, ctx) {
    const visible = ref(props.defaultVisible)
    const contentRef = ref()
    const triggerRef = ref()

    let popperInstance: Instance

    const toggleVisible = () => {
      visible.value = !visible.value
      nextTick(() => {
        popperInstance.update()
      })
    }

    onMounted(() => {
      nextTick(() => {
        popperInstance = createPopper(triggerRef.value.children[0], contentRef.value, {
          placement: 'bottom-end',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-42, -12]
              }
            }
          ],
          strategy: 'fixed'
        })
        // onClickOutside(triggerRef.value.children[0], () => {
        //   visible.value = false
        // })
      })
    })

    return () => {
      return (
        <>
          <div class="inline-block" ref={triggerRef} onClick={toggleVisible}>
            {ctx.slots.default?.()}
          </div>
          <div v-show={visible.value} class={props.contentClass} ref={contentRef}>
            {ctx.slots.content?.()}
          </div>
        </>
      )
    }
  }
})
