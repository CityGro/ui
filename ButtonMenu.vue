<template>
  <div class="btn-group ui-button-menu" :class="{'btn-group': group}">
    <slot/>
    <dropdown
      :align="align"
      :close-on-click="closeOnClick"
      :open-on-hover="true"
      :orientation="orientation"
      :stop-click="stopClick"
      :visible="open">
      <span class="toggle">
        <slot name="toggle">
          <a class="btn btn-default">
            <icon name="caret-down" />
          </a>
        </slot>
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
import $ from 'jquery'
import Dropdown from './Dropdown'
import Icon from './Icon'

export default {
  name: 'ui-button-menu',
  components: {
    Dropdown,
    Icon
  },
  props: {
    orientation: {
      type: String,
      default: 'bottom'
    },
    align: {
      type: String,
      default: 'left'
    },
    group: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    stopClick: {
      type: Boolean,
      default: true
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
