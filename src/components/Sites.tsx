import { defineComponent, onMounted, PropType, ref } from 'vue'
import { Site } from '../types/data'
import { getSiteIcon } from '../utils/site'

type SiteGroups = [string, Site[]][]

let cachedData: SiteGroups

export default defineComponent({
  name: 'Sites',
  props: {
    tiny: Boolean,
    onOpened: {
      type: Function as PropType<(site: Site) => void>
    },
    onClosed: {
      type: Function as PropType<(site: Site) => void>
    }
  },
  emits: ['opened', 'closed'],
  setup(props) {
    const sites = ref<SiteGroups>(cachedData || [])

    onMounted(async () => {
      if (!cachedData) {
        // 获取数据
        const data = await fetch('data.json').then(resp => resp.json())
        sites.value = (data.sites as Site[]).reduce<SiteGroups>((arr, site) => {
          const index = arr.findIndex(item => item[0] === site.group)
          if (index > -1) {
            arr[index][1].push(site)
          } else {
            arr.push([site.group, [site]])
          }
          return arr
        }, [])
        cachedData = sites.value
      }
    })

    const onClick =  (site: Site, e: MouseEvent) => {
      e.preventDefault()
      if (site.external || e.ctrlKey || e.metaKey) {
        window.open(site.url, site.name)
      } else {
        props.onOpened?.(site)
      }
    }

    return () => (
      <div class="pt-4 px-4">
        {sites.value.map(([group, _sites]) => (
          <div key={group} class={props.tiny ? 'mb-4' : 'mb-8'}>
            <p class={`mb-${props.tiny ? '2' : '4'} text-gray-400 text-lg`}>{group}</p>
            <div class="flex flex-wrap cursor-pointer">
              {_sites.map(site => (
                <div
                  class={`flex flex-col items-center content-center mr-4 ${
                    props.tiny ? 'px-2' : 'p-2'
                  } transition duration-300 border-b-2 border-transparent hover:border-indigo-700`}
                  onClick={(e) => onClick(site, e)}
                >
                  <img src={getSiteIcon(site)} class="rounded" width="32" height="32" />
                  <span class="mt-2 text-gray-700">{site.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
})
