<template>
  <div class="resizable-column" :style="style">
    <div class="content">
      <slot />
    </div>
    <div v-if="dragging" class="col-overlay"></div>
    <div class="handle" v-if="!last" @mousedown="startResize">
      <icon name="bars" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .resizable-column {
    display: inline-block;
    height: 100%;
    position: relative;

    .col-overlay {
      bottom: 0;
      cursor: col-resize;
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }

    .content {
      height: 100%;
      width: 100%;
    }

    .handle {
      $size: $font-size-base / 2;
      align-items: center;
      cursor: col-resize;
      display: flex;
      flex-direction: column;
      font-size: $size;
      height: 100%;
      justify-content: center;
      position: absolute;
      right: -($size / 2);
      top: 0;
      width: $size;
      z-index: $zindex-modal;
    }
  }
</style>

<script>
import $ from 'jquery'
import Icon from '../Icon'
import isNumber from 'lodash/isNumber'

export default {
  name: 'resizable-column',
  props: {
    width: {
      type: [Number, String],
      required: true,
      default: 'auto'
    },
    last: {
      type: Boolean,
      default: false
    },
    dragging: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon
  },
  data () {
    return {
      startX: null
    }
  },
  computed: {
    style () {
      return {
        width: (isNumber(this.width)) ? `${this.width}px` : this.width
      }
    }
  },
  methods: {
    startResize (e) {
      this.$emit('dragging', true)
      this.startX = e.pageX
      $(window).on('mousemove', this.handleDrag)
      $(window).on('mouseup', this.endDrag)
    },
    handleDrag (e) {
      const pageX = e.pageX
      let offset = pageX - this.startX
      if (offset > 2 || offset < -2) {
        this.startX = pageX
      }
      if (offset > 10) {
        offset = 10
      } else if (offset < -10) {
        offset = -10
      }
      this.$emit('input', offset)
    },
    endDrag (e) {
      $(window).off('mousemove', this.handleDrag)
      $(window).off('mouseup', this.endDrag)
      this.$emit('dragging', false)
    }
  }
}
</script>
