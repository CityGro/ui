<template>
  <div class="modal-content">
    <div class="modal-body no-scroll">
      <button class="btn btn-primary btn-block" style="margin-bottom: 50vh;" @click="openB"> Open B </button>
      <dropdown style="margin-bottom: 50vh;">
        <button class="btn btn-primary"> Looke! <i class="fa fa-caret-down" /> </button>
        <h3 slot="content"> AT ME </h3>
      </dropdown>
      <h4> FOO </h4>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '../../Dropdown'

const ModalB = Vue.component('modal-b', {
  render (h) {
    return h('div', {
      class: {
        'modal-content': true
      }
    }, [
      h('div', {
        class: {
          'modal-body': true
        }
      }, [
        h(Dropdown, null, [
          h('button', {
            class: {
              'btn': true,
              'btn-primary': true
            }
          }, [
            'Click Me ',
            h('i', {
              class: {
                'fa': true,
                'fa-caret-down': true
              }
            }),
          ]),
          h('h3', {slot: 'content'}, 'Hey there')
        ]),
        h('h3', null, 'HAI'),
        h('p', null, 'some nonsense')
      ])
    ])
  }
})

export default {
  $modalOptions: {
    size: 'full'
  },
  components: {Dropdown},
  methods: {
    openB () {
      this.$openModal({
        content: ModalB
      })
    }
  }
}
</script>
