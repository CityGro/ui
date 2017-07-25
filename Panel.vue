<template>
  <div class="ui-panel panel">
    <slot name="heading"/>
    <slot name="body"/>
    <slot name="footer"/>
  </div>
</template>

<script>
export default {
  name: 'ui-panel'
}
</script>

<style lang="scss" scoped>
  .ui-panel {
    margin-bottom: 0;
  }
</style>
