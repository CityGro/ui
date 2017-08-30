<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
    :class="{disabled}"
    :disabled="disabled"
    :placeholder="placeholder"
    class="form-control ui-password-input"
    type="password"
  />
</template>

<style lang="scss" scoped>
  input {
    border-radius: $border-radius-base;
  }
</style>

<script>
export default {
  name: 'ui-password-input',
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
