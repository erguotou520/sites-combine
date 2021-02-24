import { defineComponent, PropType } from 'vue'
import Sites from './Sites'
import Popper from './Popper'
import { Site } from '../types/data'

export default defineComponent({
  name: 'SitesWrap',
  props: {
    tiny: {
      type: Boolean,
      default: false
    },
    onOpened: {
      type: Function as PropType<(site: Site) => void>
    },
    onClosed: {
      type: Function as PropType<(site: Site) => void>
    }
  },
  setup(props) {
    return () =>
      !props.tiny ? (
        <div>
          <h1 class="my-4 pb-4 border-b border-gray-100 text-center text-gray-700 text-2xl">
            Comunion Sites Navigation
          </h1>
          <Sites tiny={props.tiny} onOpened={props.onOpened} onClosed={props.onClosed} />
        </div>
      ) : (
        <div class="fixed right-4 bottom-4 z-50">
          <Popper
            contentClass="border border-gray-100 rounded shadow max-w-lg max-h-96 overflow-y-auto bg-white"
            v-slots={{
              content: () => <Sites tiny={props.tiny} onOpened={props.onOpened} onClosed={props.onClosed} />
            }}
          >
            <div class="w-12 h-12 flex items-center justify-center rounded-full text-gray-700 bg-white shadow cursor-pointer hover:shadow-lg transition duration-300">
              <svg viewBox="0 0 1024 1024" version="1.1" class="w-8 h-8">
                <path d="M288 106.666667A181.333333 181.333333 0 0 1 469.333333 288V469.333333H288a181.333333 181.333333 0 1 1 0-362.666666zM384 384V288A96 96 0 1 0 288 384H384z m-96 170.666667H469.333333v181.333333A181.333333 181.333333 0 1 1 288 554.666667z m0 85.333333A96 96 0 1 0 384 736V640H288z m448-533.333333a181.333333 181.333333 0 1 1 0 362.666666H554.666667V288a181.333333 181.333333 0 0 1 181.333333-181.333333z m0 277.333333A96 96 0 1 0 640 288V384h96zM554.666667 554.666667h181.333333A181.333333 181.333333 0 1 1 554.666667 736V554.666667z m85.333333 85.333333v96A96 96 0 1 0 736 640H640z" />
              </svg>
            </div>
          </Popper>
        </div>
      )
  }
})
