<template>
  <div class="inputs-example">
    <section-header :level="1">
      Inputs
    </section-header>
    <div class="form-group">
      <ui-switch v-model="onOff">
        I am a switch!
      </ui-switch>
    </div>
    <div class="form-group">
      <password-input v-model="password" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .inputs-example {
    margin-top: 1em;
  }
</style>

<script>
import PasswordInput from '../PasswordInput'
import SectionHeader from '../SectionHeader'
import UiSwitch from '../Switch'

export default {
  data () {
    return {
      onOff: false,
      password: 'do not tell anyone my secret!'
    }
  },
  components: {
    PasswordInput,
    SectionHeader,
    UiSwitch
  }
}
</script>
