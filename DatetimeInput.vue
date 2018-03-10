<template>
  <div
    v-if="compact"
    class="ui-datetime-input ui-compact"
  >
    <div class="select-day form-group">
      <date-input :value="date" @input="handleDateChange($event)" />
    </div>
    <div class="select-time form-group">
      <time-input :value="time" @input="handleTimeChange($event)" />
      <div class="text-right">
        <p>{{tz}} Timezone</p>
      </div>
    </div>
  </div>
  <div
    class="ui-datetime-input"
    v-else
  >
    <div class="select-day form-group">
      <label class="control-label">
        Date
      </label>
      <date-input :value="date" @input="handleDateChange($event)" />
    </div>
    <div class="select-time form-group">
      <label class="control-label">
        <slot name="time-label">
          Time
        </slot>
      </label>
      <time-input :value="time" @input="handleTimeChange($event)" />
      <div class="text-right">
        <p>{{tz}} Timezone</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui-date-input,
  .ui-time-input {
    display: block;
  }
  .select-time p {
    font-size: $font-size-small;
  }

  .ui-datetime-input.ui-compact {
    display: flex;
    flex-direction: row;
    align-items: center;

    .form-group {
      margin-bottom: 0;
    }

    .select-day {
      padding-bottom: 1.75em;
    }

    .select-time {
      padding-left: $padding-small-horizontal;
    }
  }
</style>

<script>
import moment from 'moment-timezone'
import split from 'lodash/fp/split'
import DateInput from 'ui/DateInput'
import TimeInput from 'ui/TimeInput'

export default {
  name: 'ui-datetime-input',
  components: {
    DateInput,
    TimeInput
  },
  props: {
    value: {
      type: String,
      default: () => moment().toISOString()
    },
    tz: {
      type: String,
      default: () => moment.tz.guess()
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    date () {
      return moment(this.value).tz(this.tz).format('YYYY-MM-DD')
    },
    time () {
      return moment(this.value).tz(this.tz).format('HH:mm:ss')
    },
    momentValue () {
      return moment(this.value)
    }
  },
  methods: {
    handleTimeChange (event) {
      const datetime = moment.tz(this.value, this.tz)
      const [hour, minute, second] = split(':')(event)
      datetime.hour(hour)
      datetime.minute(minute)
      datetime.second(second)
      this.$emit('input', datetime.toISOString())
    },
    handleDateChange (event) {
      const datetime = moment(this.value).tz(this.tz)
      const newDate = moment.tz(event, this.tz)
      if (datetime.hour()) {
        newDate.hour(datetime.hour())
      }
      if (datetime.minute()) {
        newDate.minute(datetime.minute())
      }
      console.log('nd', newDate, datetime)
      this.$emit('input', newDate.toISOString())
    }
  }
}
</script>
