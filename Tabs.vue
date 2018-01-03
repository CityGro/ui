<template>
  <ul class="ui-tabs nav nav-tabs navbar-default" :class="tabsClass">
    <slot/>
  </ul>
</template>

<style lang="scss">
  .modal-header .ui-tabs {
    margin-bottom: -16px;
  }
</style>

<style lang="scss" scoped>
  ul.ui-tabs {
    display: flex;
    flex-direction: row;
    background-color: transparent !important;
    border-color: transparent;
    padding-bottom: 1px;

    @media (max-width: $screen-md-max) {
      flex: 1;
      overflow-y: hidden;
      overflow-x: auto;
      min-height: min-content;
      align-items: flex-start !important;
      justify-content: flex-start !important;
    }

    &.hr {
      border-color: $gray-lighter;
    }

    &.align-left {
      align-items: flex-start;
      justify-content: flex-start;
    }

    &.align-center {
      align-items: center;
      justify-content: center;
    }

    &.align-right {
      align-items: flex-end;
      justify-content: flex-end;
    }
  }
</style>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'left'
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabsClass () {
      return {
        [`align-${this.align || 'left'}`]: true,
        'hr': this.border
      }
    }
  }
}
</script>
