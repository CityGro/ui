import $ from 'jquery'
import Column from './Column'
import Vue from 'vue'
import clone from 'lodash/clone'
import range from 'lodash/range'
import sum from 'lodash/sum'
import round from 'lodash/round'

export default Vue.component('resizable', {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    },
    columns: {
      type: Number,
      default: 2
    }
  },
  computed: {
    cols () {
      return this.value
    },
    total () {
      return sum(range(1, this.columns + 1).map(this.getColSize))
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
      return `calc(${n}%)`
    },
    steal (i, diff) {
      let w = this.getColSize(i + 1) - diff
      if (w < 1) {
        w = 1
      }
      return this.sanityCheck(w)
    },
    fixOverflow () {
      const overflow = this.total - 100
      const trim = Math.abs(round(overflow / this.columns))
      let cols = {}
      range(1, this.columns + 1).forEach((i) => {
        cols[`col${i}`] = this.cols[`col${i}`] - trim
      })
      this.$emit('input', cols)
    },
    sanityCheck (n) {
      if (this.total > 100) {
        this.$nextTick(() => this.fixOverflow())
      }
      return (n > 100) ? n - 1 : n
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
            const width2 = round((width2Px / parentWidth) * 100)
            const diff = width2 - width
            self.$emit('input', {
              ...self.cols,
              [`col${i}`]: self.sanityCheck(width2),
              [`col${i + 1}`]: self.steal(i, diff)
            })
          }
        }
      }, self.$slots[`col${i}`])
    }))
  }
})
