<template>
  <div class="ui-switch ui-toggle" :class="stateClass" role="button" @click="handleClick">
    <div class="state" :class="stateClass">
      <span class="sr-only">
        this switch is {{ state }}
      </span>
    </div>
    <label class="ui-pretty-overflow">
      <slot />
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .ui-toggle {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: $input-height-base;
    overflow: hidden;

    label {
      height: 100%;
      line-height: $input-height-base;
      margin: 0;
    }

    .state {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: 160%;
      display: inline-block;
      height: 100%;
      margin-right: $padding-base-horizontal / 2;
      width: $input-height-base;

      &.on {
        background-image: url(assets/images/noun_1113307_79F0AC.svg);
      }

      &.off {
        background-image: url(assets/images/noun_1113308_caced7.svg);
      }
    }

    &.sm {
      height: $input-height-small;

      label {
        line-height: $input-height-small;
      }

      .state {
        width: $input-height-small;
      }
    }

    &.lg {
      height: $input-height-large;

      label {
        line-height: $input-height-large;
      }

      .state {
        width: $input-height-large;
      }
    }
  }
</style>

<script>
export default {
  name: 'ui-toggle',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    state () {
      return (this.value) ? 'on' : 'off'
    },
    stateClass () {
      return {
        'on': this.value === true,
        'off': this.value === false
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
