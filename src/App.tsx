import { defineComponent, onMounted, ref } from 'vue'
import SitesLayout from './components/SitesLayout'
import SitesWrap from './components/SitesWrap'
import './styles/main.css'
import { Site } from './types/data'

export default defineComponent({
  name: 'App',
  props: {},
  setup() {
    navigator.serviceWorker.register(`/worker/github.js`).then(() => {
      console.log('install 11')
    })
    const openedSites = ref<Site[]>([])
    const onOpened = (site: Site) => {
      if (openedSites.value.every(s => s.name !== site.name)) {
        openedSites.value.push(site)
      }
    }
    const onClosed = (site: Site) => {
      const index = openedSites.value.indexOf(site)
      if (index > -1) {
        openedSites.value.splice(index, 1)
      }
    }
    return () => {
      const tinyMode = openedSites.value.length > 0
      return (
        <div class={`${tinyMode ? '' : 'max-w-screen-md'} mx-auto h-screen flex flex-col`}>
          <SitesWrap tiny={tinyMode} onOpened={onOpened} onClosed={onClosed} />
          <SitesLayout openedSites={openedSites.value} />
        </div>
      )
    }
  }
})
