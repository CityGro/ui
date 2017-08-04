<template>
  <div class="btn-group">
    <slot/>
    <dropdown :visible="open" :orientation="orientation" :openOnHover="true">
      <span class="toggle">
        <slot name="toggle" />
      </span>
      <span slot="content">
        <slot name="menu" />
      </span>
    </dropdown>
  </div>
</template>

<style lang="scss" scoped>
  .ui-dropdown {
    right: 0;
    color: $text;

    &.ui-top {
      bottom: 133%;
    }
  }

  .btn-group > .toggle > * {
    width: 2em;
    padding: 0;
  }
</style>

<script>
import Dropdown from './Dropdown'
import $ from 'jquery'

export default {
  components: {Dropdown},
  props: {
    orientation: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {open: false}
  },
  methods: {
    toggleDropdown () {
      this.open = !this.open
    }
  },
  mounted () {
    const input = $(this.$el)
    const handler = (event) => {
      if (!input.is(event.target) && input.has(event.target).length === 0 && this.open) {
        this.toggleDropdown()
      }
    }
    $(document).on('click', handler)
    this._unsubscribe = () => $(document).off('click', handler)
  },
  beforeDestroy () {
    this._unsubscribe()
  }
}
</script>
