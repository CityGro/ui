<template>
  <transition name="cg-fade">
    <div :class="classNames">
      <slot>
        <i class="fa fa-spinner fa-spin"></i>
      </slot>
    </div>
  </transition>
</template>

<style lang="scss">
.cg-overlay {
  background-color: rgba(0,0,0,0.4);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
  opacity: 1;
  border-radius: 5px;
  z-index: $zindex-component-overlay;

  &.app-overlay {
    z-index: $zindex-app-overlay;
  }

  &.cg-overlay-blue {
    background-color: rgba(39, 168, 224, 0.11);
    color: rgba(0, 0, 0, 0.36);
  }

  &.cg-overlay-dark {
    background-color: rgba(0,0,0,0.6);
  }
}
</style>

<script>
export default {
  props: {
    app: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    component () {
      return !this.app
    },
    classNames () {
      return {
        'cg-overlay': true,
        'app-overlay': this.app,
        'component-overlay': this.component,
        'overlay-dark': this.color === 'dark',
        'overlay-blue': this.color === 'blue'
      }
    }
  }
}
</script>
