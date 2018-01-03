<template>
  <!-- TODO deprecate unprefixed class names -->
  <div class="ui-card card">
    <header class="title">
      <slot name="title" />
    </header>
    <div class="content">
      <slot />
    </div>
    <div class="action">
      <slot name="action" />
    </div>
  </div>
</template>

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
    cursor: pointer;

    .title {
      font-size: 18px;
      line-height: 22px;

      & > h1,
      & > h2,
      & > h3,
      & > h4,
      & > h5,
      & > h6 {
        margin-top: 0;
      }
    }

    .content {
      font-size: small;
      margin-bottom: 10px;
      height: 66%;
      overflow-y: auto;
    }

    .action {
      text-align: center;
      margin-top: auto;
    }
  }
</style>

<script>
export default {
  name: 'ui-card'
}
</script>
