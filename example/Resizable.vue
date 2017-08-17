<template>
  <div class="resizable-example">
    <section-header :level="1">
      Resizable
    </section-header>
    <resizable v-model="cols">
      <div class="foo" slot="col1">
        Resize Me
      </div>
      <div slot="col2">
        Resize Me
      </div>
    </resizable>
  </div>
</template>

<style lang="scss" scoped>
  .resizable-example {
    margin-top: 1em;
  }

  .foo {
    height: 128px;
    border: 1px solid $text-color;
    padding: $padding-base-vertical $padding-base-horizontal;
  }
</style>

<script>
import SectionHeader from '../SectionHeader'
import Resizable from '../Resizable'

export default {
  components: {
    SectionHeader,
    Resizable
  },
  data () {
    return {
      cols: {}
    }
  }
}
</script>
