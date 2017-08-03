<template>
  <div class="ui-dropdown"
    :class="{'ui-dropdown-active': visible}"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave">
    <span
      ref="dropdownButton"
      class="ui-dropdown-button"
      @click="handleClick">
      <slot/>
    </span>
    <div
      v-show="visible"
      ref="dropdownContent"
      :class="type"
      :style="allDropdownStyles"
      @mouseover="cancelTimeout"
      @click.stop="handleMenuClick">
      <div class="ui-dropdown-content-wrapper">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @mixin depth {
    box-shadow: 1px 1px 5px rgba(#000, 0.33);
    border: 1px solid $bg;
  }

  .ui-dropdown {
    position: relative;
    display: inline-block;
  }

  .ui-dropdown-button {
    cursor: pointer;
    display: block; /* For the sake of calculating a height based on inner content */
  }

  .ui-dropdown-content {
    @include depth;

    background-color: $bg2;
    border-radius: 1%;
    padding: 0.75em;
    text-align: left;
    max-width: 100%;
    overflow: auto;
    z-index: $zindex-dropdown;

    .ui-dropdown-content-wrapper {
      flex: 1;
    }
  }
</style>

<script>
import $ from 'jquery'
import toNumber from 'lodash/toNumber'
import Popper from 'popper.js'

/**
 * @param {String} [orientation=auto] - orientation (top, bottom, or auto)
 * @param {String} [align=right] - alignment (left or right)
 * @param {Boolean} [closeOnClick=true] - close on click
 * @param {Boolean} [openOnHover=true] - open on hover
 */
export default {
  data () {
    return {
      visible: false,
      dropdownStyles: {},
      popper: null
    }
  },
  props: {
    orientation: {
      type: String,
      default: 'bottom'
    },
    align: {
      type: String,
      default: 'right'
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Number,
      default: 70
    },
    scroll: {
      type: Boolean,
      default: true
    },
    scrollHeight: {
      type: Number,
      default: 33
    },
    dropdownStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    type () {
      return {
        'ui-dropdown-content': true
      }
    },
    autoScroll () {
      if (this.scroll) {
        return {
          'max-height': `${this.scrollHeight}vh`
        }
      }
    },
    allDropdownStyles () {
      return {...this.dropdownStyle, ...this.dropdownStyles}
    },
    placements () {
      let variation = ''
      if (this.align === 'right') {
        variation = '-end'
      } else if (this.align === 'left') {
        variation = '-start'
      }
      return `${this.orientation}${variation}`
    }
  },
  methods: {
    handleClick () {
      if (this.visible) {
        return this.handleClose()
      }
      this.visible = true
      $(document).off('click', this.closeFn)
      $(this.$el).parents().off('click', this.closeFn)
      this.$nextTick(() => {
        setTimeout(() => {
          $(document).one('click', this.closeFn)
          $(this.$el).parents().one('click', this.closeFn)
        })
      })
    },
    handleEnter () {
      if (this.openOnHover) {
        this.visible = true
        $(document).off('click', this.closeFn)
        $(this.$el).parents().off('click', this.closeFn)
        this.$nextTick(() => {
          setTimeout(() => {
            $(document).one('click', this.closeFn)
            $(this.$el).parents().one('click', this.closeFn)
          })
        })
        this.cancelTimeout()
      }
    },
    cancelTimeout () {
      if (this._timeout) {
        clearTimeout(this._timeout)
      }
    },
    handleLeave () {
      if (this.openOnHover) {
        this._timeout = setTimeout(() => {
          this.handleClose()
        }, 300)
      }
    },
    handleClose () {
      this.visible = false
      this.dropdownStyles = {}
      $(document).off('click', this.closeFn)
      $(this.$el).parents().off('click', this.closeFn)
    },
    handleMenuClick () {
      if (this.closeOnClick) {
        this.handleClose()
      }
    }
  },
  created () {
    this.$on('close', this.handleClose)
    this.closeFn = () => {
      this.handleClose()
    }
  },
  mounted () {
    this.popper = new Popper(this.$refs.dropdownButton, this.$refs.dropdownContent, {
      placement: this.placements,
      removeOnDestroy: true,
      modifiers: {
        preventOverflow: {
          enabled: true
        },
        flip: {
          enabled: true
        }
      }
    })
  },
  beforeDestroy () {
    this.$off('close', this.handleClose)
    $(document).off('click', this.closeFn)
    $(this.$el).parents().off('click', this.closeFn)
    this.popper.destroy()
  }
}

</script>
