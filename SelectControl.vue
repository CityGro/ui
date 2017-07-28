<template>
  <select
    class="ui-select-control form-control"
    :value="value"
    @input="handleChange($event)">
    <option
      v-if="placeholder"
      :selected="!value"
      value="">
      {{placeholder}}
    </option>
    <option
      v-for="option in options"
      :selected="option.value == value"
      :value="option.value">
      {{option.key}}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ui-select-control',
  props: {
    value: {
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  methods: {
    handleChange (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
