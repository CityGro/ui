<template>
  <dropdown
    :close-on-click="false"
    :scroll="false"
    ref="dropdown"
    class="cg-date-range-picker-wrapper">
    <slot/>
    <div slot="content" class="cg-date-range-picker">
      <div class="text-left row small-gutters">
        <div class="col-sm-12">
          <calendar v-model="dateRange" :range="true" :months="months || 3"/>
        </div>
      </div>
      <div class="text-right">
        <a class="btn btn-success apply" @click.stop.prevent="apply">Apply</a>
      </div>
    </div>
  </dropdown>
</template>

<script>
import Moment from 'moment'
import Calendar from 'ui/Calendar'
import Dropdown from 'ui/Dropdown'

export default {
  props: {
    value: {
      type: Object,
      default: function () {
        return {start: Moment().subtract(1, 'month'), end: Moment()}
      }
    },
    months: {
      type: Number,
      default: 3
    },
    forceOpen: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      dateRange: this.value || {start: Moment().subtract(1, 'month'), end: Moment()}
    }
  },
  watch: {
    value: function () {
      this.dateRange = this.value
    }
  },
  methods: {
    apply: function () {
      this.$emit('input', this.dateRange)
      this.$refs.dropdown.$emit('close')
    }
  },
  components: {
    Calendar,
    Dropdown
  }
}
</script>

<style lang="scss" scoped>
  .cg-date-range-picker {
    text-align: right;
    height: 320px;

    .apply {
      position: absolute;
      bottom: 0.5em;
      right: 0.75em;
    }
  }
</style>
