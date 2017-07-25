<template>
  <dropdown class="ui-date-input" ref="dropdown" align="left" :close-on-click="false">
    <span class="input-group">
      <input
        :value="dateFormat"
        type="text"
        class="form-control"
        readonly
      />
      <span @click="toggleDropdown" class="input-group-addon">
        <i class="fa fa-calendar" />
      </span>
    </span>
    <div slot="content">
      <calendar
        :value="momentDate"
        @input="handleChange($event)"
      />
    </div>
  </dropdown>
</template>

<script>
// @flow

import $ from 'jquery'
import moment from 'moment'

import Calendar from './Calendar'
import Dropdown from './Dropdown'

/**
 * @modules ui/DateInput
 * @param {String} value - date (YYYY-MM-DD)
 * @param {Boolean} [open=false] - is open
 * @param {String} [orientation=bottom] - direction to show dropdown
 *
 * dates are formatted according the the current locale.
 *
 * ```html
 * <date-input v-model="date" />
 * ```
 */
export default {
  components: {
    Calendar,
    Dropdown
  },
  props: {
    value: {
      type: String,
      default: () => null
    },
    open: {
      type: Boolean,
      default: false
    },
    orientation: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      showDropdown: this.open
    }
  },
  computed: {
    momentDate () {
      return moment(this.value, 'YYYY-MM-DD')
    },
    dateFormat () {
      return this.value ? moment(this.value, 'YYYY-MM-DD').format('L') : 'Select Date'
    }
  },
  mounted () {
    const input = $(this.$el)
    const handler = (event) => {
      if (!input.is(event.target) && input.has(event.target).length === 0 && this.showDropdown) {
        this.toggleDropdown()
      }
    }
    this._unsubscribe = () => $(document).off('click', handler)
  },
  beforeDestroy () {
    this._unsubscribe()
  },
  methods: {
    handleChange (event) {
      this.$emit('input', moment(event).format('YYYY-MM-DD'))
      this.$refs.dropdown.$emit('close')
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-date-input {
    position: relative;

    input {
      background-color: $input-bg !important;
    }
  }
</style>
