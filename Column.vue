<template>
  <div class="ui-column" :class="getClass">
    <slot/>
  </div>
</template>

<script>
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import merge from 'lodash/merge'

/**
 * @param {({size: String, cols: Number}[]|Number)} size
 * @param {({size: String, cols: Number}[]|Number)} offset
 */
export default {
  name: 'ui-column',
  props: {
    size: {
      type: [Number, Array],
      required: true
    },
    offset: {
      type: [Number, Array],
      default: 0
    }
  },
  computed: {
    sizes () {
      if (isNumber(this.size)) {
        return {
          [`col-sm-${this.size}`]: true
        }
      } else if (isArray(this.size)) {
        const sizes = this.size.map((o) => ({[`col-${o.size}-${o.cols}`]: true}))
        return merge({}, ...sizes)
      }
    },
    offsets () {
      if (isNumber(this.offset)) {
        return {
          [`col-sm-offset-${this.offset}`]: Boolean(this.offset)
        }
      } else if (isArray(this.offset)) {
        const offsets = this.offsets.map((o) => ({[`col-${o.size}-offset-${o.cols}`]: Boolean(o.size)}))
        return merge({}, ...offsets)
      }
    },
    getClass () {
      return {...this.sizes, ...this.offsets}
    }
  }
}
</script>
