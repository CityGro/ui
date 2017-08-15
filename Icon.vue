<template>
  <i class="ui-icon fa" :class="iconClass" />
</template>

<script>
export default {
  name: 'ui-icon',
  props: {
    name: {
      type: String,
      default: 'fa'
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      return {
        'fa-spin': this.spin,
        [`fa-${this.name}`]: true
      }
    }
  }
}
</script>
