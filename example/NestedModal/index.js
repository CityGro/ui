import Vue from 'vue'

import NestedModal from './NestedModal'

import SectionHeader from '../../SectionHeader'

export default Vue.component('nested-modal-sample', {
  render (h) {
    const self = this
    return h('div', null, [
      h(SectionHeader, {
        props: {
          level: 1
        }
      }, 'Nested Modal'),
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
      }, 'Open Modal')
    ])
  }
})
