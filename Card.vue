<template>
  <div class="ui-card" @click="$emit('click', $event)">
    <header class="title" @click="$emit('click', $event)">
      <slot name="title" />
    </header>
    <div class="content" @click="$emit('click', $event)">
      <slot />
    </div>
    <div class="action" @click="$emit('click', $event)">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui-card {
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

    &.active {
      background-color: $brand-primary;
      color: $component-active-color;
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
