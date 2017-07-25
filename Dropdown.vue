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

<script>
import $ from 'jquery'
import toNumber from 'lodash/toNumber'

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
      currentOrientation: this.orientation,
      dropdownStyles: {}
    }
  },
  props: {
    orientation: {
      type: String,
      default: 'auto'
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
        /* 'ui-left': this.align === 'left',
        'ui-right': this.align !== 'left',
        'ui-top': (this.currentOrientation === 'top'),
        'ui-bottom': (this.currentOrientation === 'bottom'),
        'ui-scroll': this.scroll
        */
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
    }
  },
  methods: {
    handleClick () {
      if (this.visible) {
        return this.handleClose()
      }
      this.visible = true
      this.dropdownStyles = {}
      $(document).off('click', this.closeFn)
      $(this.$el).parents().off('click', this.closeFn)
      this.$nextTick(() => {
        this.computeDropdownStyles()
        setTimeout(() => {
          $(document).one('click', this.closeFn)
          $(this.$el).parents().one('click', this.closeFn)
        })
      })
    },
    handleEnter () {
      if (this.openOnHover) {
        this.visible = true
        this.dropdownStyles = {}
        $(document).off('click', this.closeFn)
        $(this.$el).parents().off('click', this.closeFn)
        this.$nextTick(() => {
          this.computeDropdownStyles()
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
    },
    computeDropdownStyles () {
      this.dropdownStyles = {}
      if (!this.$el) {
        return
      }
      let buttonHeight = 0
      let buttonWidth = 0
      if (this.$refs.dropdownButton) {
        buttonHeight = $(this.$refs.dropdownButton).outerHeight() * 1
        buttonWidth = $(this.$refs.dropdownButton).outerWidth() * 1
      }

      if ($(this.$el).offset().left < ($(window).width() / 2.1)) {
        this.dropdownStyles.left = $(this.$el).offset().left + 'px'
        if ($(this.$el).offset().left + $(this.$refs.dropdownContent).outerWidth() > $(window).width()) {
          this.dropdownStyles.right = 0
        }
      } else {
        this.dropdownStyles.right = ($(window).width() - $(this.$el).offset().left - buttonWidth) + 'px'
        if ($(this.$refs.dropdownContent).outerWidth() + ($(window).width() - $(this.$el).offset().left - buttonWidth) > $(window).width()) {
          this.dropdownStyles.left = 0
        }
      }

      if ($(this.$el).offset().top < ($(window).height() / 2.1)) {
        this.dropdownStyles.top = 2 + $(this.$el).offset().top + buttonHeight + 'px'
        if (10 + $(this.$el).offset().top + buttonHeight + $(this.$refs.dropdownContent).outerHeight() > $(window).height()) {
          this.dropdownStyles.bottom = 0
        }
      } else {
        this.dropdownStyles.bottom = 2 + ($(window).height() - $(this.$el).offset().top) + 'px'
        if (10 + ($(window).height() - $(this.$el).offset().top) + $(this.$refs.dropdownContent).outerHeight() > $(window).height()) {
          this.dropdownStyles.top = 0
        }
      }
    }
  },
  watch: {
    visible (visible) {
      if (visible && this.orientation === 'auto') {
        const $el = $(this.$el)
        const viewport = toNumber($(window).height()) - toNumber(this.margin)
        const offset = $el.offset().top
        const margin = (viewport - offset)
        this.currentOrientation = ((margin > 0) && (margin < offset)) ? 'top' : 'bottom'
      }
    }
  },
  created () {
    this.$on('close', this.handleClose)
    this.computeStyles = () => {
      if (this.visible) {
        this.computeDropdownStyles()
      }
    }
    this.closeFn = () => {
      this.handleClose()
    }
    $(window).on('resize', this.computeStyles)
  },
  beforeDestroy () {
    this.$off('close', this.handleClose)
    $(window).off('resize', this.computeStyles)
    $(document).off('click', this.closeFn)
    $(this.$el).parents().off('click', this.closeFn)
  }
}

</script>

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
    $indicator: 0; /* 0.66em; */

    @include depth;

    background-color: $bg2;
    border-radius: 1%;
    padding: 0.75em;
    position: fixed;
    margin-right: $indicator / 2;
    margin-top: $indicator;
    z-index: $zindex-dropdown;
    display: flex;
    text-align: left;
    max-width: 100%;
    overflow: auto;

    .ui-dropdown-content-wrapper {
      flex: 1;
    }

    &::before {
      @include depth;

      background-color: $bg2;
      border: 1px solid $bg;
      box-shadow: 1px 1px $border-radius-base rgba(#000, 0.33);
      content: "";
      display: block;
      height: $indicator;
      position: absolute;
      transform: rotate(45deg);
      width: $indicator;
    }

    &::after {
      background-color: $bg2;
      content: "";
      display: block;
      height: $indicator * 2;
      position: absolute;
      width: $indicator * 2;
    }

    &.ui-top {
      bottom: calc(100% + 0.75em);

      &::before {
        right: $indicator / 1.3;
        bottom: -$indicator / 2.33;
      }

      &::after {
        right: $border-radius-base;
        bottom: 0;
      }
    }

    &.ui-right {
      right: 0;
    }

    &.ui-bottom {
      top: 100%;

      &::before {
        right: $indicator / 1.3;
        top: -$indicator / 2.33;
      }

      &::after {
        right: $border-radius-base;
        top: 0;
      }
    }

    &.ui-left {
      left: 0;
    }

    &.ui-scroll {
      .ui-dropdown-content-wrapper {
        overflow-y: scroll;
      }
    }
  }
</style>
