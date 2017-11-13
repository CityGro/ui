<template>
  <select
    class="ui-select-control form-control"
    :value="value"
    @input="handleChange($event)">
    <option
      v-if="showPlaceholder()"
      :selected="!value"
      value="">
      {{placeholder}}
    </option>
    <option
      v-for="option in getOptions()"
      :key="option.value"
      :selected="option.value == value"
      :value="option.value">
      {{option.key}}
    </option>
  </select>
</template>

<script>
import get from 'lodash/get'
import isString from 'lodash/isString'

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
      type: [String, Boolean],
      default: '(Please select one)'
    }
  },
  methods: {
    showPlaceholder () {
      console.log(this.placeholder)
      return isString(this.placeholder)
    },
    getOptions () {
      return this.options.map((option) => {
        if (get(option, 'key')) {
          return option
        } else {
          return {key: option, value: option}
        }
      })
    },
    handleChange (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
