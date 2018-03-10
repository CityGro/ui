<template>
  <div class="ui-cards">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .ui-cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-flow: row wrap;
    align-content: flex-end;
  }
</style>

<script>
export default {
  name: 'ui-cards'
}
</script>
