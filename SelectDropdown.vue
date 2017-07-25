<template>
  <div class="form-group">
    <label v-if="label" class="control-label"> {{ label }} </label>
    <select
      class="ui-select-dropdown form-control"
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
    <span v-if="errors" v-for="error in errors" class="help-block">{{error}}</span>
  </div>
</template>

<script>
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
