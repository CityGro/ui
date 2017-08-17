import $ from 'jquery'
import Column from './Column'
import Vue from 'vue'
import close from 'lodash/clone'
import range from 'lodash/range'
import toInteger from 'lodash/toInteger'

export default Vue.component('resizable', {
  data () {
    return {
      cols: {}
    }
  },
  props: {
    columns: {
      type: Number,
      default: 2
    }
  },
  methods: {
    isLast (i) {
      return i === this.columns
    },
    getColSize (i) {
      let n = this.cols[`col${i}`]
      if (n === undefined) {
        n = 100 / this.columns
      }
      return n
    },
    widthStyle (i) {
      const n = this.getColSize(i)
      return `calc(${n}% - 5px)`
    },
    steal (i, diff) {
      let w = this.getColSize(i + 1) - diff
      if (w < 1) {
        w = 1
      }
      return w
    }
  },
  render (h) {
    const self = this
    return h('div', {
      class: 'ui-resizable'
    }, range(1, self.columns + 1).map((i) => {
      return h(Column, {
        props: {
          width: self.widthStyle(i),
          last: self.isLast(i)
        },
        on: {
          input (offset) {
            const parentWidth = $(self.$el).width()
            const width = self.getColSize(i)
            const width2Px = (parentWidth * (width / 100)) + offset
            const width2 = toInteger((width2Px / parentWidth) * 100)
            const diff = width2 - width
            self.cols[`col${i}`] = width2
            self.cols[`col${i + 1}`] = self.steal(i, diff)
            self.$forceUpdate()
          }
        }
      }, self.$slots[`col${i}`])
    }))
  }
})
