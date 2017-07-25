<template>
  <div class="ui-tooltip" v-tooltip.top-center="tooltip">
    <slot name="icon">
      <i class="fa fa-question-circle"/>
    </slot>
    <div class="ui-tooltip-content" ref="tooltipContent">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-tooltip',
  data () {
    return {
      tooltip: ''
    }
  },
  mounted () {
    this.tooltip = this.$refs.tooltipContent.innerHTML
  }
}
</script>

<style lang="scss" scoped>
  .ui-tooltip-content {
    display: none;
  }
</style>
