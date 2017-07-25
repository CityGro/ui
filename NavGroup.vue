<template>
  <div class="ui-nav-group">
    <section-header
      v-if="header"
      :level="5">
      {{ header }}
    </section-header>
    <ul class="nav nav-pills nav-stacked">
      <slot/>
    </ul>
  </div>
</template>

<script>
import SectionHeader from 'ui/SectionHeader'

export default {
  name: 'nav-group',
  components: {SectionHeader},
  props: ['header']
}
</script>

<style lang="scss">
  .ui-nav-group {
    .ui-section-header {
      color: #ADADAD;
      border-bottom: none;
      margin: 0.5em 0 0.5em 0;
      padding-left: 1.5em;
      padding-top: 1.5em;
      border-top: 1px solid $gray;
      font-weight: normal !important;
    }

    .nav-pills {
      $size: $font-size-base * 1.1;

      li a[href] {
        text-transform: uppercase;
        color: #fff;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 1.5em;

        span {
          display: inline-block;
          line-height: $size;
          vertical-align: text-bottom;
          margin-left: 0.5em;
          font-size: $size * 0.7;
        }

        &:hover {
           background-color: transparent;
           color: $gray-lighter;
        }

        &.router-link-active {
          background-color: $gray-light;
          color: #fff;
        }
      }

      i.fa {
        display: inline-block;
        text-align: center;
        width: $size * 1.5;
        height: $size * 1.5;
        font-size: $size;
        line-height: $size * 1.5;
      }
    }
  }
</style>
