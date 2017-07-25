<template>
  <div class="ui-well well">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ui-well'
}
</script>

<style lang="scss" scoped>
  .ui-well,
  .well {
    margin-bottom: 0;
  }
</style>
