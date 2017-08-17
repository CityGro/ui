<template>
  <div class="resizable-column" :style="style">
    <div class="content">
      <slot />
    </div>
    <div class="handle" v-if="!last" draggable @drag="handleResize">
      <icon name="bars" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .resizable-column {
    position: relative;
    height: 100%;
    display: inline-block;

    .content {
      width: 100%;
      height: 100%;
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
    }
  }
</style>

<script>
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
    }
  },
  components: {
    Icon
  },
  computed: {
    style () {
      return {
        width: (isNumber(this.width)) ? `${this.width}px` : this.width
      }
    }
  },
  methods: {
    handleResize (e) {
      if (e.x !== 0) {
        this.$emit('input', e.offsetX)
      }
    }
  }
}
</script>
