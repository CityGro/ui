<template>
  <div class="inputs-example">
    <section-header :level="1">
      Inputs
    </section-header>
    <div class="form-group">
      <toggle v-model="onOff">
        I am a switch!
      </toggle>
    </div>
    <div class="form-group">
      <password-input v-model="password" />
    </div>
    <select-dropdown
      :options="pOptions"
      :placeholder="false"
      label="Primitive Options"
      v-model="pValue"
    />
    <select-dropdown
      :options="kvOptions"
      label="Key/value Options"
      v-model="kvValue"
    />
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
import SelectDropdown from '../SelectDropdown'
import Toggle from '../Toggle'

export default {
  data () {
    return {
      onOff: false,
      password: 'do not tell anyone my secret!',
      kvOptions: [
        {key: 'Foo', value: 'foo'},
        {key: 'Bar', value: 'bar'}
      ],
      kvValue: null,
      pOptions: [1, 2, 3],
      pValue: 1
    }
  },
  components: {
    PasswordInput,
    SectionHeader,
    SelectDropdown,
    Toggle
  }
}
</script>
