<template>
  <div class="card">
    <slot/>
  </div>
</template>

<script>
export default { }
</script>

<style lang="scss" scoped>
  .card {
    $width: 14em;

    display: flex;
    flex-direction: column;
    text-align: center;
    width: $width;
    height: $width * 1.3;
    padding: 1em;
    margin: 0.5em;
    border: 1px solid $bg;
    border-radius: 2.5%;
  }
</style>
