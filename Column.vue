<template>
  <div :class="getClass">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'column',
  props: {
    size: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getClass () {
      return {
        [`col-sm-${this.size}`]: true,
        [`col-sm-offset-${this.offset}`]: Boolean(this.offset)
      }
    }
  }
}
</script>
