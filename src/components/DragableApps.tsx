import { defineComponent, onMounted, reactive, ref } from 'vue'
import Popper from './Popper'

interface Position {
  left: string
  right: string
  top: string
  bottom: string
}

function getPosition(pos: Position) {
  return {
    left: pos.right === 'auto',
    top: pos.bottom === 'auto',
    right: pos.left === 'auto',
    bottom: pos.top === 'auto'
  }
}

export default defineComponent({
  name: 'Dragable',
  props: {},
  setup(props, ctx) {
    const position = reactive<Position>({
      left: 'auto',
      right: '64px',
      top: 'auto',
      bottom: '64px'
    })

    const onMousedown = (e: MouseEvent) => {
      const pos = getPosition(position)
      // const
    }

    return () => (
      <div class="fixed right-4 bottom-4" style={position} onMousedown={onMousedown}>
        <Popper
          contentClass="border border-gray-100 rounded shadow max-w-lg max-h-96 overflow-y-auto"
          v-slots={{
            content: ctx.slots.default
          }}
        >
          <div class="w-12 h-12 flex items-center justify-center rounded-full text-gray-700 shadow cursor-pointer hover:shadow-lg transition duration-300">
            <svg viewBox="0 0 1024 1024" version="1.1" class="w-8 h-8">
              <path d="M288 106.666667A181.333333 181.333333 0 0 1 469.333333 288V469.333333H288a181.333333 181.333333 0 1 1 0-362.666666zM384 384V288A96 96 0 1 0 288 384H384z m-96 170.666667H469.333333v181.333333A181.333333 181.333333 0 1 1 288 554.666667z m0 85.333333A96 96 0 1 0 384 736V640H288z m448-533.333333a181.333333 181.333333 0 1 1 0 362.666666H554.666667V288a181.333333 181.333333 0 0 1 181.333333-181.333333z m0 277.333333A96 96 0 1 0 640 288V384h96zM554.666667 554.666667h181.333333A181.333333 181.333333 0 1 1 554.666667 736V554.666667z m85.333333 85.333333v96A96 96 0 1 0 736 640H640z" />
            </svg>
          </div>
        </Popper>
      </div>
    )
  }
})
