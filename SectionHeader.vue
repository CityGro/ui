<template>
  <header :class="computedClass">
    <section-title v-if="!hideTitle" :level="level">
      <slot/>
    </section-title>
    <div class="ui-section-header-content">
      <slot name="content" />
    </div>
  </header>
</template>

<script>
import Vue from 'vue'

const SectionTitle = Vue.component('section-title', {
  render (h) {
    return h(`h${this.level}`, {class: {'ui-pretty-overflow': true}}, this.$slots.default)
  },
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
})

/**
 * @param {number} level - header level (1-6)
 * @param {boolean} [separator=true] - enable or disable the bottom separator
 * @param {object} slots.default - title
 * @param {object} slots.content - extra content
 */
export default {
  components: {SectionTitle},
  props: {
    level: {
      type: Number,
      required: true
    },
    separator: {
      type: Boolean,
      default: true
    },
    bold: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClass () {
      return {
        'ui-section-header': true,
        'ui-section-header-separator': this.separator,
        'ui-section-header-bold': this.bold,
        'ui-section-header-center': this.center,
        'ui-section-header-hidden-title': this.hideTitle
      }
    }
  }
}
</script>

<style lang="scss">
  header.ui-section-header {
    color: $text;
    margin-bottom: 1em;
    padding-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: center;

    &.ui-section-header-separator {
     border-bottom: 1px solid $bg;
    }

    &.ui-section-header-bold {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: bold;
      }
    }

    &.ui-section-header-center {
      text-align: center;
      justify-content: center;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding: 0;
        width: 100%;
      }
    }

    &.ui-section-header-hidden-title {
      .ui-section-header-content {
        margin-left: 0;

        @media (max-width: $screen-md-max) {
          width: 100%;
        }
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding-left: 0.25em;
      line-height: 1.2;
    }

    .ui-section-header-content {
      margin-left: auto;
    }
  }
</style>
