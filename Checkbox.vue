<template>
  <div class="ui-checkbox" :class="classDef" @click.prevent.stop="onClick">
    <input
      ref="checkbox"
      type="checkbox"
      :checked="value"
      :disabled="disabled"
    />
    <span :style="spanStyle">
      <label>
        <slot/>
      </label>
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .ui-checkbox {
    margin-bottom: 0;
    display: inline-block;
  }
  input[type="checkbox"] {
    display: none;

    & + span {
      display: flex !important;
      flex-direction: row;
      align-items: center;

      label {
        line-height: 1em;
        margin: 0;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
  .checkbox,
  input[type="checkbox"] + span  {
    padding-left: 25px;
    font-family: $font-family-sans-serif;
    font-weight: light;
    display: inline-block;
    font-size: $font-size-base;
    line-height: 25px;
    min-height: 25px;
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 25px 25px;
    vertical-align: middle;
    cursor: pointer;
    /* Image of checkbox. Placed in as a background image. */
    background-image: url(assets/images/checkbox.png);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* Changes position of background image to make checkmark visible */
    input[type="checkbox"]:checked + span {
      background-image: url(assets/images/checkbox-checked.png)
    }
  .checkbox.active {
    background-image: url(assets/images/checkbox-active.png)
  }
  .checkbox-md,
  .checkbox.checkbox-md {
    min-height: 20px;
    background-size: 20px 20px;
  }
  .checkbox-sm,
  .checkbox.checkbox-sm {
    min-height: 25px;
    background-size: 15px 15px;
  }
  .checkbox-md input[type="checkbox"] + span,
  .checkbox.checkbox-md {
    padding-left: 20px;
    line-height: 20px;
    min-height: 20px;
    background-size: 20px 20px;
  }
  .checkbox-sm input[type="checkbox"] + span,
  .checkbox.checkbox-sm {
    padding-left: 15px;
    line-height: 15px;
    min-height: 15px;
    background-size: 15px 15px;
  }

  /* second checkbox image style */
    .outline-checkbox input[type="checkbox"] + span  {
      background-image: url(assets/images/checkbox-outline.png);
    }
  .outline-checkbox input[type="checkbox"]:checked + span  {
    background-image: url(assets/images/checkbox-outline-checked.png);
  }

</style>

<script>
/**
 * @module ui/Checkbox
 * @param {Boolean} value - is checked?
 *
 * ```html
 * <checkbox v-model="checked" class="danger">
 *   Launch Torpedo
 * </checkbox>
 * ```
 */
export default {
  name: 'ui-checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    fill: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    spanStyle: {
      type: Object
    }
  },
  data () {
    return {
      lastMouseEvent: {}
    }
  },
  computed: {
    classDef () {
      return {
        'outline-checkbox': !this.fill,
        'checkbox-inline': this.inline,
        'checkbox-md': this.size === 'md',
        'checkbox-sm': this.size === 'sm'
      }
    }
  },
  methods: {
    onClick (event) {
      this.$emit('input', !this.value)
      this.$emit('click', event)
    }
  }
}
</script>
