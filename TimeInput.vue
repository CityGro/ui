<template>
  <dropdown
    class="ui-time-input"
    ref="dropdown"
    :close-on-click="false"
    align="right">
    <span class="input-group">
      <input
        type="text"
        class="form-control"
        :value="formattedTime"
        readonly="readonly"
      />
      <span class="input-group-addon">
        <i class="fa fa-clock-o"/>
      </span>
    </span>
    <div slot="content" class="dropdown-content">
      <div class="time-components">
        <div class="time-component">
          <label>
            Hour
          </label>
          <select
            @input="change('hour', $event.target.value)"
            :value="hour12">
            <option v-if="hour12 === null" :value="null"></option>
            <option v-for="h in hourOptions" :value="h">{{h}}</option>
          </select>
        </div>
        <div class="time-component">
          <label>
            Minute
          </label>
          <select
            @input="change('minute', $event.target.value)"
            :value="minute">
            <option v-for="m in minuteOptions" :value="m * 1">{{m}}</option>
          </select>
        </div>
        <div class="time-component">
          <label>
            AM/PM
          </label>
          <select
            @input="change('ampm', $event.target.value)"
            :value="ampm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
      <div class="recommendations" v-if="recommendations.length" @click="toggleDropdown">
        <strong style="margin-bottom: 6px;">Suggested Times</strong>
        <div>
          <button
            v-for="recommendation in recommendations"
            @click="change('recommendation', recommendation)"
            class="btn btn-default btn-sm">
            {{formatTime(recommendation)}}
          </button>
        </div>
      </div>
    </div>
  </dropdown>
</template>

<script>
import Dropdown from './Dropdown'
import rangeRight from 'lodash/fp/rangeRight'
import map from 'lodash/fp/map'
import padStart from 'lodash/fp/padCharsStart'
import flow from 'lodash/fp/flow'
import Moment from 'moment'

/**
 * @param {String} value - time (ISO 8601)
 */
export default {
  components: {
    Dropdown
  },
  props: {
    value: {
      type: String
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDropdown: this.open,
      recommendations: [
        (Moment().hour(Moment().hour() + 1).minute(0).second(0)).format('HH:mm:ss'), // Suggest the next hour
        (Moment().hour(Moment().hour() + 1).minute(0).second(0)).format('H') * 1 === 12 ? '13:00:00' : '12:00:00',
        '15:00:00',
        '17:00:00'
      ],
      hourOptions: [12, ...rangeRight(11, 0)],
      minuteOptions: flow(
        map((n) => n - 1),
        map(padStart('0', 2))
      )(rangeRight(60, 0))
    }
  },
  computed: {
    parsedValue () {
      if (typeof this.value === 'string' && this.value.match(/^\d\d:\d\d(:\d\d)?$/)) {
        return this.value.split(':')
      }
      return []
    },
    hour12 () {
      if (this.hour === null) {
        return null
      }
      var hour = this.hour
      if (hour * 1 === 0) {
        return 12
      }
      if (hour >= 13) {
        return hour - 12
      }
      return hour * 1
    },
    hour () {
      if (typeof this.parsedValue[0] !== 'undefined') {
        return this.parsedValue[0]
      }
      return null
    },
    minute () {
      if (typeof this.parsedValue[1] !== 'undefined') {
        return this.parsedValue[1] * 1
      }
      return 0
    },
    ampm () {
      if (typeof this.parsedValue[0] !== 'undefined') {
        if (this.parsedValue[0] * 1 >= 12 && this.parsedValue[0] <= 23) {
          return 'PM'
        }
        return 'AM'
      }
      return 'PM'
    },
    formattedTime () {
      if (this.hour === null || this.minute === null) {
        return ''
      }
      return this.formatTime(padStart('0', 2, this.hour * 1) + ':' + padStart('0', 2, this.minute * 1) + ':' + '00')
    }
  },
  methods: {
    formatTime (value) { // Accepts a string in H:MM:SS format and returns a localized string
      var parts = value.split(':')
      return (Moment()).hour(parts[0] * 1).minute(parts[1] * 1).second(parts[2] * 1).format('LT')
    },
    change (type, value) {
      let hour = this.hour
      let minute = this.minute
      switch (type) {
        case 'hour':
          hour = value
          if (hour * 1 === 12) {
            if (this.ampm === 'AM') {
              hour = 0
            } else {
              hour = 12
            }
          } else {
            if (this.ampm === 'AM') {
              // Do nothing
            } else {
              hour = hour * 1 + 12
            }
          }
          break
        case 'minute':
          minute = value
          break
        case 'ampm':
          if (value === 'AM') {
            if (hour * 1 >= 12) {
              hour -= 12
            }
          } else if (value === 'PM') {
            if (hour * 1 < 12) {
              hour = hour * 1 + 12
            }
          }
          break
        case 'recommendation':
          this.$emit('input', value)
          this.$refs.dropdown.$emit('close')
          return
      }
      this.$emit('input', padStart('0', 2, hour * 1) + ':' + padStart('0', 2, minute * 1) + ':00')
    },
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-time-input {
    position: relative;

    input {
      background-color: $input-bg !important;
    }

    .dropdown-content {
      width: 330px;
      display: flex;
      flex-direction: column;
    }

    .time-components {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .time-component {
      text-align: left;
      margin-right: 15px;
      flex: 1;
      &:last-child {
        margin-right: 0;
      }

      label,
      select {
        display: block;
      }
    }

    .recommendations {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-flow: row wrap;
      align-content: flex-end;
      border-top: 1px solid $body-bg;
      margin-top: 1em;
      padding-top: 0.7em;

      button {
        margin-right: 0.25em;
      }
    }
  }
</style>
