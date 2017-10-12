<template>
  <row :class="computedClass">
    <slot/>
  </row>
</template>

<style lang="scss" scoped>
  .ui-module {
    border-radius: $border-radius-base;
    overflow: hidden;

    &.scroll {
      overflow-y: scroll;
    }

    &.active {
      background-color: $component-active-color;
      box-shadow: 0 0 $border-radius-base $gray-lighter;
    }

    &.gutter {
      margin: 1em;
      padding: 1em;
    }

    &.full-height {
      height: calc(100vh - 1.05em);

      @media (max-width: $screen-md-max) {
        height: calc(100% - 1em);
      }
    }

    &.gutter.full-height {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    &.fill {
      height: 100%;

      @media (max-width: $screen-md-max) {
        height: calc(100% - 2em);
      }
    }
  }
</style>

<script>
import Row from 'ui/Row'

export default {
  name: 'ui-module',
  components: {Row},
  props: {
    gutter: {
      type: Boolean,
      default: true
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: true
    },
    scroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClass () {
      return {
        'ui-module': true,
        'gutter': this.gutter,
        'full-height': this.fullHeight,
        'fill': this.fill && !this.fullHeight,
        'active': this.active,
        'scroll': this.scroll
      }
    }
  }
}
</script>
