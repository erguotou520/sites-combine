import { defineComponent, PropType } from 'vue'
import { Site } from '../types/data'
import Website from './Site'

function calcSiteWidth(len: number) {
  if (len <= 1) {
    return ['100%']
  }
  if (len === 2) {
    return ['50%', '50%']
  }
  if (len === 3) {
    return ['33.333%', '33.333%', '33.333%']
  }
  if (len === 4) {
    return ['50%', '50%', '50%', '50%']
  }
  if (len === 5) {
    return ['33.333%', '33.333%', '33.333%', '50%', '50%']
  }
  return ['33.333%', '33.333%', '33.333%', '33.333%', '33.333%', '33.333%']
}

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
      const widthList = calcSiteWidth(len)
      return (
        <>
          <div class="flex flex-1 flex-wrap">
            {props.openedSites.map((site, index) => (
              <Website key={site.name} site={site} style={{ width: widthList[index] }} />
            ))}
          </div>
        </>
      )
    }
  }
})
