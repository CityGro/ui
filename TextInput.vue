<template>
  <input
    class="form-control"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder || ''"
  />
</template>

<script>
export default {
  props: ['value', 'placeholder']
}
</script>

<style lang="scss" scoped>
  input {
    border-radius: $border-radius-base;
  }
</style>
