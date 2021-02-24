import { defineComponent, PropType } from 'vue'
import { Site } from '../types/data'
import Website from './Site'

export default defineComponent({
  name: 'SitesLayout',
  props: {
    openedSites: {
      type: Array as PropType<Site[]>,
      required: true
    }
  },
  setup(props, ctx) {
    return () => {
      const len = props.openedSites.length
      if (len <= 3) {
        return (
          <div class="flex flex-1">
            {props.openedSites.map(site => (
              <Website class="flex-1" key={site.name} url={site.url} />
            ))}
          </div>
        )
      }
      const firstCols = len <= 5 ? 2 : 3
      return (
        <>
          <div class="flex flex-1">
            {props.openedSites.slice(0, firstCols).map(site => (
              <Website class="flex-1" key={site.name} url={site.url} />
            ))}
          </div>
          <div class="flex flex-1">
            {props.openedSites.slice(firstCols).map(site => (
              <Website class="flex-1" key={site.name} url={site.url} />
            ))}
          </div>
        </>
      )
    }
  }
})
