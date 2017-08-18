<template>
  <div class="resizable-example">
    <section-header :level="1">
      Resizable
    </section-header>
    <resizable v-model="cols">
      <div class="a-col" slot="col1">
        Resize Me
      </div>
      <div class="a-col" slot="col2">
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/UJsUpeXK6Jo" frameborder="0" allowfullscreen></iframe>
      </div>
    </resizable>
  </div>
</template>

<style lang="scss" scoped>
  .resizable-example {
    margin-top: 1em;
  }

  .ui-resizable {
    border: 1px solid $brand-primary;
  }

  .a-col {
    border: 1px solid $brand-success;
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
      cols: {
        col1: 25,
        col2: 75
      }
    }
  }
}
</script>
