<template>
  <ul class="ui-tabs nav nav-tabs navbar-default" :class="tabsClass">
    <slot/>
  </ul>
</template>

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
        ['align-' + (this.align || 'left')]: true,
        'hr': this.border
      }
    }
  }
}
</script>

<style lang="scss">
  @mixin tab {
    background-color: transparent;
    color: $gray;
    border: none;
    border-bottom: 3px solid transparent;
    transition: border-bottom-color ease 0.5s;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 25px;
    padding-right: 25px;

    &:hover {
      cursor: pointer;
      background-color: transparent;
      border-bottom-color: $brand-primary;
    }
  }

  @mixin active-tab {
    border-bottom-color: $brand-primary;
    font-weight: bold;
    color: $text-color;

    &:hover {
      color: $text-color;
      border: none;
      border-bottom: 3px solid $lightBlue;
   }
  }

  ul.ui-tabs {
    display: flex;
    flex-direction: row;
    background-color: transparent !important;
    border-color: transparent;
    padding-bottom: 1px;

    @media (max-width: $screen-md-max) {
      width: 100%;
      overflow-y: hidden;
      overflow-x: scroll;
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

    & > li.active > a {
      @include tab;
      @include active-tab;
    }

    & > li > a[href],
    & > li > a {
      @include tab;

      &.router-link-active {
        @include active-tab;
      }

    }
  }
</style>
