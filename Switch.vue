<template>
  <div class="ui-switch" :class="stateClass" role="button" @click="handleClick">
    <div class="state" :class="stateClass">
      <span class="sr-only">
        this switch is {{ state }}
      </span>
    </div>
    <label>
      <slot />
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .ui-switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: $input-height-base;

    label {
      height: 100%;
      margin: 0;
      line-height: $input-height-base;
    }

    .state {
      display: inline-block;
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: $padding-base-horizontal / 2;
      height: 100%;
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
  name: 'ui-switch',
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
