<template>
  <div :class="getClass">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'container',
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'container': !this.fluid,
        'container-fluid': this.fluid
      }
    }
  }
}
</script>
