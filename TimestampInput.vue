<template>
  <div class="ui-timestamp-input">
    <dropdown
      ref="dropdown"
      :close-on-click="false"
      align="right">
      <div class="form-group ui-timestamp-control">
        <span class="input-group">
          <input
            type="text"
            class="form-control"
            :value="formattedTime + ' '"
            readonly="readonly"
          />
          <span class="input-group-addon">
            <i class="fa fa-clock-o"/>
          </span>
        </span>
      </div>
      <div slot="content" class="dropdown-content">
        <label class="control-label">
          Date
        </label>
        <div>
          <select-dropdown
            placeholder="Month"
            :value="month"
            :options="months"
            @input="handleChange('month', $event)"
          />
          <select-dropdown
            placeholder="Day"
            :value="day"
            :options="days"
            @input="handleChange('day', $event)"
          />
          <select-dropdown
            placeholder="Year"
            :value="year"
            :options="years"
            @input="handleChange('year', $event)"
          />
        </div>
        <br />
        <label class="control-label">
          Time
        </label>
        <div>
          <select-dropdown
            placeholder="Hour"
            :value="hour12"
            :options="hours"
            @input="handleChange('hour', $event)"
          />
          <select-dropdown
            placeholder="Minute"
            :value="minute"
            :options="minutes"
            @input="handleChange('minute', $event)"
          />
          <select-dropdown
            placeholder="AM/PM"
            :value="ampm"
            :options="amorpm"
            @input="handleChange('ampm', $event)"
          />
        </div>
      </div>
    </dropdown>
    <p class="text-right">
      <small> {{tz}} Timezone </small>
    </p>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import toNumber from 'lodash/toNumber'

import SelectDropdown from 'ui/SelectDropdown'
import Dropdown from 'ui/Dropdown'

import years from 'utils/years'
import months from 'utils/months'
import days from 'utils/days'
import hours from 'utils/hours'
import minutes from 'utils/minutes'

export default {
  name: 'ui-timestamp-input',
  components: {
    Dropdown,
    SelectDropdown
  },
  props: {
    value: {
      type: String,
      required: true,
      default: () => moment().toISOString()
    },
    tz: {
      type: String,
      default: () => moment.tz.guess()
    },
    open: {
      type: Boolean,
      default: false
    },
    label: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      months: months(),
      hours: hours(),
      minutes: minutes(),
      years: years(),
      amorpm: [
        {key: 'AM', value: 'AM'},
        {key: 'PM', value: 'PM'}
      ]
    }
  },
  computed: {
    year () {
      return (this.value) ? moment(this.value).year() : null
    },
    month () {
      return (this.value) ? moment(this.value).month() : null
    },
    day () {
      return (this.value) ? moment(this.value).date() : null
    },
    days () {
      return days(this.month)
    },
    hour12 () {
      if (this.value) {
        const hour = moment(this.value).tz(this.tz).hour()
        if (hour === 0) {
          return 12
        } else if (hour >= 13) {
          return hour - 12
        } else {
          return hour
        }
      } else {
        return null
      }
    },
    minute () {
      return (this.value) ? moment(this.value).tz(this.tz).minute() : null
    },
    ampm () {
      if (this.value) {
        const hour = moment(this.value).tz(this.tz).hour()
        if (hour > 12) {
          return 'PM'
        } else if (hour <= 12) {
          return 'AM'
        }
      } else {
        return null
      }
    },
    formattedTime () {
      if (this.value === null) {
        return 'No time selected'
      }
      return moment(this.value).tz(this.tz).format('MMM D, YYYY, h:mm a')
    }
  },
  methods: {
    handleChange (key, value) {
      let date = moment(this.value).tz(this.tz)
      switch (key) {
        case 'year':
          date.year(value)
          break
        case 'month':
          date.month(value)
          break
        case 'day':
          date.date(value)
          break
        case 'hour':
          if (toNumber(value) === 12 && this.ampm === 'AM') {
            date.hour(0)
          } else if (this.ampm === 'PM') {
            date.hour(toNumber(value) + 12)
          } else {
            date.hour(value)
          }
          break
        case 'minute':
          date.minute(value)
          break
        case 'ampm':
          const hour = date.hour()
          if (value === 'AM' && hour >= 12) {
            date.hour(hour - 12)
          } else if (value === 'PM' && hour < 12) {
            date.hour(hour + 12)
          }
          break
      }
      this.$emit('input', date.tz('UTC').toISOString())
    }
  }
}
</script>

<style lang="scss">
  .ui-timestamp-input {
    position: relative;
    display: inline-block;

    .ui-timestamp-control {
      margin-bottom: 0;
    }

    .dropdown-content {
      & > p {
        margin-bottom: 0;
      }

      & > div {
        display: flex;
        flex-direction: row;

        .form-group {
          flex: 1;

          & + .form-group {
            margin-left: $padding-small-horizontal;
          }
        }
      }
    }

    input {
      background-color: $input-bg !important;
    }
  }
</style>
