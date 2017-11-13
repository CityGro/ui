<template>
  <div class="form-group ui-select-dropdown">
    <label v-if="label" class="control-label"> {{ label }} </label>
    <select-control
      :value="value"
      :options="options"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    />
    <span v-if="errors" v-for="error in errors" class="help-block">{{error}}</span>
  </div>
</template>

<script>
import SelectControl from './SelectControl'

export default {
  name: 'ui-select-dropdown',
  props: {
    value: {
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    errors: {
      default: false
    },
    label: {
      default: null
    },
    placeholder: {
      type: [String, Boolean],
      default: '(Please select one)'
    }
  },
  components: {
    SelectControl
  }
}
</script>
