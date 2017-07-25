<template>
  <div class="ui-progress-bar progress">
    <div
      class="progress-bar"
      role="progressbar"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
      :style="{width: width}">
      <span class="sr-only">{{width}} Complete</span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ui-progress-bar',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    width () {
      return `${this.value}%`
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-progress-bar,
  .progress {
    border-radius: $border-radius-large + 4px;
  }
</style>
