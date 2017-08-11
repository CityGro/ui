<template>
  <div>
    <ui-switch v-model="onOff">
      I am a switch!
    </ui-switch>
  </div>
</template>

<script>
import UiSwitch from '../Switch'

export default {
  data () {
    return {
      onOff: false
    }
  },
  components: {
    UiSwitch
  }
}
</script>
