<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    :class="{disabled}"
    :disabled="disabled"
    :placeholder="placeholder"
    class="form-control"
    type="text"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    border-radius: $border-radius-base;
  }
</style>
