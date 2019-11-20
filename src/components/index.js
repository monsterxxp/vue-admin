import DictSelect from './DictSelect/index.vue'
import SearchBox from './SearchBox/index.vue'
import SkSelect from './SkSelect/index.vue'

const component = {
  install: function(Vue) {
    Vue.component('DictSelect', DictSelect)
    Vue.component('SearchBox', SearchBox)
    Vue.component('SkSelect', SkSelect)
  }
}

export default component
