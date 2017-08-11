import Vue from 'vue'
import VueModal from '@citygro/vue-modal'
import style from '../style'

Vue.use(VueModal)

import NestedModal from './NestedModal'
import Menus from './Menus'
import Inputs from './Inputs'

new Vue({
  render (h) {
    const self = this
    return h('div', null, [
      h(NestedModal),
      h(Menus),
      h(Inputs),
      h('modal-view', {
        on: {
          progress: (loading) => {
            self.modalLoading = loading
          },
          open: () => {
            console.log('[@citygro/vue-modal example] open event')
          },
          close: () => {
            console.log('[@citygro/vue-modal example] close event')
          },
          dismiss: () => {
            console.log('[@citygro/vue-modal example] dismiss event')
          }
        }
      })
    ])
  }
}).$mount('#root')
