<template>
  <div class="input-group ui-password-input">
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      :class="{disabled}"
      :disabled="disabled"
      :placeholder="placeholder"
      class="form-control"
      :type="type"
    />
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="showPassword = !showPassword">
        <icon v-if="showPassword" name="eye-slash" />
        <icon v-else-if="hidePassword" name="eye" />
      </button>
    </span>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'ui-password-input',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Password'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    type () {
      return (this.showPassword) ? 'text' : 'password'
    },
    hidePassword () {
      return !this.showPassword
    }
  }
}
</script>
