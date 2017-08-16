<template>
  <div class="inputs-example">
    <section-header :level="1">
      Inputs
    </section-header>
    <ui-switch v-model="onOff">
      I am a switch!
    </ui-switch>
  </div>
</template>

<style lang="scss" scoped>
  .inputs-example {
    margin-top: 1em;
  }
</style>

<script>
import SectionHeader from '../SectionHeader'
import UiSwitch from '../Switch'

export default {
  data () {
    return {
      onOff: false
    }
  },
  components: {
    SectionHeader,
    UiSwitch
  }
}
</script>
