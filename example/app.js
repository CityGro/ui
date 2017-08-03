import Vue from 'vue'
import VueModal from '@citygro/vue-modal'
import style from '../style'

Vue.use(VueModal)

new Vue({
  data () {
    return {
      modalLoading: false
    }
  },
  render (h) {
    const self = this
    return h('div', null, [
      h('button', {
        class: {
          'btn': true,
          'btn-primary': true
        },
        on: {
          click: () => {
            self.$openModal({
              content: (resolve) => require(['./NestedModal'], resolve)
            })
          }
        }
      }, 'Open Modal'),
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
