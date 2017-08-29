<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    :class="{disabled}"
    :disabled="disabled"
    :placeholder="placeholder"
    class="form-control ui-text-input"
    type="text"
  />
</template>

<style lang="scss" scoped>
  input {
    border-radius: $border-radius-base;
  }
</style>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
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
