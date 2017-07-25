<template>
  <label class="ui-checkbox" :class="classDef" @click="onClick">
    <input
      type="checkbox"
      :checked="isChecked"
      @change="onChange"
      :disabled="disabled"
    />
    <span :style="spanStyle"> <slot/> </span>
  </label>
</template>

<script>
import property from 'lodash/property'
import isArray from 'lodash/isArray'
import reject from 'lodash/reject'
import includes from 'lodash/includes'
import concat from 'lodash/concat'

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
      type: [Array, Boolean],
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
    },
    isChecked () {
      if (isArray(this.value)) {
        const checkedValue = this.checkedValue()
        return includes(this.value, checkedValue)
      } else {
        return this.value
      }
    }
  },
  methods: {
    checkedValue () {
      return property('attributes.value.value')(this.$el)
    },
    onClick (event) {
      // Hackish way to determine if SHIFT was pressed when the value changes (for contacts table)
      this.lastMouseEvent = event
    },
    onChange (event) {
      event.shiftKey = this.lastMouseEvent && this.lastMouseEvent.shiftKey
      const checked = event.target.checked
      if (isArray(this.value)) {
        const checkedValue = this.checkedValue()
        if (checked && includes(this.value, checkedValue)) {
          this.$emit('input', this.value)
        } else if (checked) {
          this.$emit('input', concat(this.value, [checkedValue]))
        } else {
          this.$emit('input', reject(this.value, (value) => value === checkedValue))
        }
      } else {
        this.$emit('input', checked)
      }
      // Useful for determining if the shift key is pressed when clicked (event.shiftKey)
      this.$emit('inputEvent', event)
    }
  }
}

</script>

<style lang="scss" scoped>
  .ui-checkbox {
    margin-bottom: 0;
  }
  input[type="checkbox"] {
    display: none;
  }
  .checkbox,
  input[type="checkbox"] + span  {
    padding-left: 30px;
    font-family: $font-family-sans-serif;
    font-weight: light;
    display: inline-block;
    font-size: $font-size-base;
    line-height: $input-height-large;
    min-height: $input-height-large;
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 25px 25px;
    vertical-align: middle;
    cursor: pointer;
  /* Image of checkbox. Placed in as a background image. */
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAj0lEQVR42mPYtn+/zMGDZ+2On77yn9p436GzzosW7eRmAFlw+PiFiweOnPNkoCIAmXf4xPlb+/adMGYA2UhtC5AtOnry4kGwJQw0BGDzRy0ZtWTUklFLRi0ZtWTUEnpZsnXvUflDJy68Zzhw+KwvqFVB7cYE2IJjF/aDaIalW7YIHjh8JpDabS6QD8AWAAEAMtNVlHlMeMsAAAAASUVORK5CYII=');
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* Changes position of background image to make checkmark visible */
    input[type="checkbox"]:checked + span {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACZ0lEQVR42r2WTU8TURSGZ+XeX+A/cKE7/4I7Exca4oImJixwRWI/sAUXmhRNbFJtNRBjowilBWODElGjAWShorQaoTad2Er9qJ077VA6naF9PXdQYquWghcneTOZxZznnPOeM3MlyXN0z4nEwH5bMiCfTAchSp0Ur2PRe4DHlzigMxWQneoYRKo7O6h1ZQaXjsd9ByVO7F4ZUkRDevLD1p13SOKliQb8Kh6/AeJgYSGy/5BwiF0ZbZBDNMRJOs9iuKO9gI9NwVHYAAmF9LFxTJUXodcMVGpVDBWfoJdFBEEo234CxMqvUK/XYdRMZM0C/OoDuJgI45UwPMo4hrVnUEwNVQK8q+ZwSb1vta8tTzwsCpcytmliM+Asm8CINo+M8c0CpI2vVgUNXrWCXC4+xHM9jdf6B1wtPraCNnsQKs1CpsAV8iFlfIGXTf4+EK0g10tPrcx4j2UjjxsUkFdlvUjAK5REsvrJArypfrQmy5omJdyQ0JbtuqXNIctbUTfx3viMkDYLtxLFRfUe5ipJrNZ0xPUMAgTspQR4e7dVCZerEMZoaR45U8EaBVwmUx+tvUW8mkGZnnkrg9RKbr6H2vfH/Wlnunj5t8ncFQL9vMz6OpYI6FenNwCkZs+2BeFyKxGEijNY1nPQ1it4WZHhVSepRRH0KRObXv0ThOucehex1QVMlxMYIABfNF7BGSXa+nOzk2XkE8Qz76cdcbPo1t+0nUCc1pZH/2p0W5D/8tPaNQj/x+8WoCd/k9lSfiZ1JHyHbKmgfErwYeJ0YQRd8jV2ZOHCPunwjH3vMX4sEnzu4hVYALq+AzAUf/BGP32tAAAAAElFTkSuQmCC')
    }
  .checkbox.active {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACZ0lEQVR42r2WTU8TURSGZ+XeX+A/cKE7/4I7Exca4oImJixwRWI/sAUXmhRNbFJtNRBjowilBWODElGjAWShorQaoTad2Er9qJ077VA6naF9PXdQYquWghcneTOZxZznnPOeM3MlyXN0z4nEwH5bMiCfTAchSp0Ur2PRe4DHlzigMxWQneoYRKo7O6h1ZQaXjsd9ByVO7F4ZUkRDevLD1p13SOKliQb8Kh6/AeJgYSGy/5BwiF0ZbZBDNMRJOs9iuKO9gI9NwVHYAAmF9LFxTJUXodcMVGpVDBWfoJdFBEEo234CxMqvUK/XYdRMZM0C/OoDuJgI45UwPMo4hrVnUEwNVQK8q+ZwSb1vta8tTzwsCpcytmliM+Asm8CINo+M8c0CpI2vVgUNXrWCXC4+xHM9jdf6B1wtPraCNnsQKs1CpsAV8iFlfIGXTf4+EK0g10tPrcx4j2UjjxsUkFdlvUjAK5REsvrJArypfrQmy5omJdyQ0JbtuqXNIctbUTfx3viMkDYLtxLFRfUe5ipJrNZ0xPUMAgTspQR4e7dVCZerEMZoaR45U8EaBVwmUx+tvUW8mkGZnnkrg9RKbr6H2vfH/Wlnunj5t8ncFQL9vMz6OpYI6FenNwCkZs+2BeFyKxGEijNY1nPQ1it4WZHhVSepRRH0KRObXv0ThOucehex1QVMlxMYIABfNF7BGSXa+nOzk2XkE8Qz76cdcbPo1t+0nUCc1pZH/2p0W5D/8tPaNQj/x+8WoCd/k9lSfiZ1JHyHbKmgfErwYeJ0YQRd8jV2ZOHCPunwjH3vMX4sEnzu4hVYALq+AzAUf/BGP32tAAAAAElFTkSuQmCC')
  }
  .checkbox-md,
  .checkbox.checkbox-md {
    min-height: $input-height-base;
    background-size: 20px 20px;
  }
  .checkbox-sm,
  .checkbox.checkbox-sm {
    min-height: $input-height-small;
    background-size: 15px 15px;
  }
  .checkbox-md input[type="checkbox"] + span,
  .checkbox.checkbox-md {
    line-height: $input-height-base;
    min-height: $input-height-base;
    background-size: 20px 20px;
  }
  .checkbox-sm input[type="checkbox"] + span,
  .checkbox.checkbox-sm {
    line-height: $input-height-small;
    min-height: $input-height-small;
    background-size: 15px 15px;
  }

  /* second checkbox image style */
    .outline-checkbox input[type="checkbox"] + span  {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAj0lEQVR42mPYtn+/zMGDZ+2On77yn9p436GzzosW7eRmAFlw+PiFiweOnPNkoCIAmXf4xPlb+/adMGYA2UhtC5AtOnry4kGwJQw0BGDzRy0ZtWTUklFLRi0ZtWTUEnpZsnXvUflDJy68Zzhw+KwvqFVB7cYE2IJjF/aDaIalW7YIHjh8JpDabS6QD8AWAAEAMtNVlHlMeMsAAAAASUVORK5CYII=');
    }
  .outline-checkbox input[type="checkbox"]:checked + span  {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACCklEQVR42mOo/1/PlHZ3pm7o1amv0+7N+E8tDDIv+c5UldAzHfwMIAtirk9fEHNtpiQDFQHIvJjrM9ak3J4twxB5bdajmCtzVBhoAEAWhV6Z8pYB5DUGGgKw+aOWoIOIc51SiTcnuURd65GnviX1DEwRl3tlk29PLUy5O21p6u3J7tS2hDHiDsiCKY3Jt6c9SLk9bXf8zYnO1LSEMfbGZEWgD6qBFrxJuTPtQOK9qSFaq0LZiLbEod6BJWF/PYfKtlx2bPKhF/qkk+5MnZh6d9oPoAWHEq73O5Ac8anXJ7sDXdmXcH+SBcjVyD5wu9jNnXxn2oqU21N+Jt+aeizu3iQzslIX0JVxKbenP0q+O31q6IUWaZi4D9AHQAuOAB3wE6hmT+iVCXJojiDekozr/QpAw1al3Jr6FhixSaCgS7zUpwQMmqMpd6d/T7k1bUPsjW5FhlAGZrLzifHMNNaE21M9gBacTgIanHBnan7qvWkHUoEWJN+d2hcFtBCUfCnOjC5nyvmTbk+tT7477QGw2L6Temfau8RbU3qjbrYrUTXHx13vVUu6NXVH8s2prxKB+SHmTp8KTYqVxJtTAlNuTcmLvj1JBl8kj5bCQ8iSsOvTX1K7EQEDUdemyKfcnfqeIf3hDK3YGzOWULsxAbbg1vT9IJoh6cZc3hRgkR1+fcZzara7QD4AWwAEADz9yKyj+08DAAAAAElFTkSuQmCC');
  }

</style>
