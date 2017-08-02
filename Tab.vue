<template>
  <li class="ui-tab" :class="classNames">
    <a @click="activate">
      <slot />
    </a>
  </li>
</template>

<style lang="scss" scoped>
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

  .ui-tab {
    &.active > a {
      @include tab;
      @include active-tab;
    }

    & > a[href],
    & > a {
      @include tab;

      &.router-link-active {
          @include active-tab;
      }
    }
  }
</style>

<script>
export default {
  name: 'ui-tab',
  props: {
    value: {
      required: true
    },
    activeIf: {
      required: true
    }
  },
  methods: {
    activate () {
      this.$emit('input', this.activeIf)
    }
  },
  computed: {
    classNames () {
      return {
        'active': this.value === this.activeIf
      }
    }
  }
}
</script>
