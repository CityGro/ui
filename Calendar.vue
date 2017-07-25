<template>
  <div class="cg-calendar">
    <div class="cg-calendar-range" v-if="range">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-6 col-sm-4">
              <span class="cg-date-input-label">Start:</span>
              <span class="cg-date-inputs" :class="{selected: rangeTarget == 'start'}" @click="rangeTarget = 'start'">{{value && value.start ? value.start.format(rangeInputFormat) : ''}}</span>
          </div>
          <div class="col-xs-6 col-sm-4">
              <span class="cg-date-input-label">End:</span>
              <span class="cg-date-inputs" :class="{selected: rangeTarget == 'end'}" @click="rangeTarget = 'end'">{{value && value.end ? value.end.format(rangeInputFormat) : ''}}</span>
          </div>
          <div class="col-xs-12 col-sm-4" v-if="shortcuts.length" style="margin-left: auto;">
            <span style="top: 2px;" class="cg-date-input-label">Date Range:</span>
            <select class="form-control" :value="rangeShortcut" @change="selectRangeShortcut">
              <option :value="null" v-if="rangeShortcut === null">Custom</option>
              <option :value="$index" v-for="(option, $index) in shortcuts">{{option.label}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="cg-calendars-container">
      <i class="fa fa-angle-left cg-previous" @click="changeMonth(-1)"></i>
      <i class="fa fa-angle-right cg-next" @click="changeMonth(1)"></i>
      <div class="cg-calendar-container" v-for="calendar in calendars">
        <header>
          <div class="text-center">
            <span class="cg-month-name">{{calendar.moment.format(monthFormat)}} / {{calendar.moment.format(yearFormat)}}</span>
          </div>
        </header>
        <!-- Month View -->
        <table class="table table-condensed">
          <thead>
            <tr>
              <th v-for="weekday in weekdays" class="week">{{weekday}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in calendar.weeks">
              <td class="cg-day" :class="dayClass(day, calendar.moment)" v-for="day in week" @click="selectDay(day)">
                <span>
                  {{day.format(dayFormat)}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'

module.exports = {
  props: {
    value: {
      default () {
        if (this.range) {
          return {start: null, end: null}
        }
        return Moment()
      }
    },
    time: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    locale: { // @TODO: Implement this
      type: String,
      default: 'en-US'
    },
    months: {
      type: Number,
      default: 1
    },
    weekdayFormat: {
      type: String,
      default: 'ddd'
    },
    dayFormat: {
      type: String,
      default: 'D'
    },
    monthFormat: {
      type: String,
      default: 'MMM'
    },
    yearFormat: {
      type: String,
      default: 'YYYY'
    },
    rangeInputFormat: {
      type: String,
      default: 'MMM D, YYYY'
    },
    shortcuts: {
      type: Array,
      default () {
        if (this.range) {
          return [
            {
              label: 'This Week',
              value: {start: Moment().startOf('week'), end: Moment()}
            },
            {
              label: 'Last Week',
              value: {start: Moment().subtract(1, 'weeks').startOf('week'), end: Moment().subtract(1, 'weeks').endOf('week')}
            },
            {
              label: 'This Month',
              value: {start: Moment().startOf('month'), end: Moment()}
            },
            {
              label: 'Last Month',
              value: {start: Moment().subtract(1, 'months').startOf('month'), end: Moment().subtract(1, 'months').endOf('month')}
            },
            {
              label: 'Past 7 Days',
              value: {start: Moment().subtract(7, 'days'), end: Moment()}
            },
            {
              label: '7 to 14 days ago',
              value: {start: Moment().subtract(14, 'days'), end: Moment().subtract(7, 'days')}
            },
            {
              label: 'Last 30 days',
              value: {start: Moment().subtract(30, 'days'), end: Moment()}
            },
            {
              label: 'Last 60 days',
              value: {start: Moment().subtract(60, 'days'), end: Moment()}
            },
            {
              label: '30 to 60 days ago',
              value: {start: Moment().subtract(60, 'days'), end: Moment().subtract(30, 'days')}
            },
            {
              label: 'Last 90 days',
              value: {start: Moment().subtract(90, 'days'), end: Moment()}
            },
            {
              label: '60 to 90 days ago',
              value: {start: Moment().subtract(90, 'days'), end: Moment().subtract(60, 'days')}
            }
          ]
        }
        return []
      }
    }
  },
  data: function () {
    return {
      moment: Moment(),
      rangeTarget: 'start'
    }
  },
  created () {
    this.setViewMoment()
  },
  computed: {
    calendars () {
      let calendars = []

      for (let calendarIndex = 1; calendarIndex <= this.months; calendarIndex++) {
        // This centers the currentMoment on the group of multiple calendars
        let calendarIteratorMoment = Moment(this.moment).subtract(this.months - calendarIndex, 'months').startOf('month')

        let calendar = {
          moment: Moment(calendarIteratorMoment),
          weeks: []
        }

        calendars.push(calendar)

        let currentMonthIndex = calendarIteratorMoment.month()

        if (calendarIteratorMoment.format('d') * 1 > 0) {
          calendarIteratorMoment.startOf('week')
        }

        do {
          let week = []
          for (let i = 0; i < 7; i++) {
            week.push(Moment(calendarIteratorMoment))
            calendarIteratorMoment.add(1, 'days')
          }
          calendar.weeks.push(week)
        } while (calendarIteratorMoment.month() === currentMonthIndex)
      }

      return calendars
    },
    weekdays () {
      let m = Moment().startOf('week')
      let weekdays = []
      for (let i = 0; i < 7; i++) {
        weekdays.push(m.format(this.weekdayFormat))
        m.add(1, 'day')
      }
      return weekdays
    },
    // Computed value that determines if a shortcut in the dropdown should be selected
    rangeShortcut () {
      if (!this.range || !this.value || !this.value.start || !this.value.end) {
        return null
      }

      for (let i = 0; i < this.shortcuts.length; i++) {
        if (this.shortcuts[i].value && this.value.start.isSame(this.shortcuts[i].value.start, 'day') && this.value.end.isSame(this.shortcuts[i].value.end, 'day')) {
          return i
        }
      }

      return null
    }
  },
  methods: {
    // Handle selecting a shortcut from the dropdown
    selectRangeShortcut (event) {
      if (event && event.target && event.target.value && this.shortcuts[event.target.value] && this.shortcuts[event.target.value].value) {
        this.$emit('input', this.shortcuts[event.target.value].value)
      }
    },
    dayClass (dayMoment, monthMoment) {
      let result = {
        today: dayMoment.isSame(Moment(), 'day'),
        'outside-month': monthMoment.format('YYYYMM') !== dayMoment.format('YYYYMM')
      }
      if (this.range) {
        if (this.value) {
          // Add the selected and start class to the beginning of the range
          if (this.value.start && this.value.start.isSame(dayMoment, 'day')) {
            result.selected = true
            result.start = true
          }
          // Add the selected and end class to the end of the range
          if (this.value.end && this.value.end.isSame(dayMoment, 'day')) {
            result.selected = true
            result.end = true
          }
          // If it's between the start/end, add a ranged class
          if (this.value.start && this.value.end && dayMoment.isBetween(this.value.start, this.value.end, 'day', '()')) {
            result.ranged = true
          }

          // If the day is before the start day and targeting end or after the end and targeting start
          // disable the day
          if (this.rangeTarget === 'end' && this.value.start && dayMoment.isBefore(this.value.start)) {
            result.disabled = true
          }
          if (this.rangeTarget === 'start' && this.value.end && dayMoment.isAfter(this.value.end)) {
            result.disabled = true
          }
        }
      } else {
        result.selected = monthMoment.format('YYYYMM') === dayMoment.format('YYYYMM') && this.value && this.value.isSame(dayMoment, 'day')
      }
      return result
    },
    changeMonth (offset) {
      this.moment = Moment(this.moment.add(offset, 'months'))
    },
    selectDay (day) {
      if (this.range) {
        let value = ({...this.value} || {start: null, end: null})
        value[this.rangeTarget] = day
        if ((this.rangeTarget === 'start' && value.start && value.end && value.start.isAfter(value.end)) || (this.rangeTarget === 'end' && value.start && value.end && value.end.isBefore(value.start))) {
          // I could swap values but that ux seems confusing
          // value = {...value, start: value.end, end: value.start}
          // Instead I'm going to do nothing and flag those days as disabled
          return
        }
        this.rangeTarget = this.rangeTarget === 'start' ? 'end' : 'start'
        console.log('emit range', value)
        this.$emit('input', value)
      } else {
        this.$emit('input', day)
      }
    },
    setViewMoment () {
      // If the value is in some way between the current
      if (!this.value) {
        return
      }
      let newMoment
      if (this.range) {
        if (this.value.end || this.value.start) {
          if (this.value.start && this.value.start.isBetween(Moment(this.moment).subtract(this.months - 1, 'months').startOf('month'), Moment(this.moment).endOf('month'), 'day', '[]')) {
            return
          }
          if (this.value.end && this.value.end.isBetween(Moment(this.moment).subtract(this.months - 1, 'months').startOf('month'), Moment(this.moment).endOf('month'), 'day', '[]')) {
            return
          }
          newMoment = this.value.end || this.value.start
        } else {
          return
        }
      } else {
        if (this.value.isBetween(Moment(this.moment).subtract(this.months - 1, 'months').startOf('month'), Moment(this.moment).endOf('month'), 'day', '[]')) {
          return
        }
        // Calculate the offset of months needed
        newMoment = Moment(this.value)
      }

      // Get the number of months different rounded up
      let offset = Math.floor(newMoment.diff(this.moment, 'months', true))
      if (offset < -1 * (this.months - 1)) {
        offset += (this.months - 1)
      }
      this.moment = Moment(this.moment).startOf('month').add(offset, 'months')
    }
  },
  watch: {
    value () {
      this.setViewMoment()
    }
  }
}
</script>

<style lang="scss" scoped>
.cg-calendar {
  display: inline-block;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
}

.cg-calendar-range span.cg-date-inputs {
  display: inline-block;
  width: 100%;
  height: 36px;
  border: $gray-lighter 1px solid;
  border-radius: $border-radius-base;
  vertical-align: middle;
  cursor: pointer;
  padding: $padding-base-vertical $padding-base-horizontal;
}
.cg-calendar-range span.cg-date-input-label {
}

.cg-calendar-range span.selected {
  border: $brand-success 2px solid;
}
.cg-date-input-label {
  font-weight: 800;
  display: block;
}

.cg-calendars-container {
  position: relative;
  display: inline-block;
  text-align: center;
}
.cg-previous {
  position: absolute;
  top: 4px;
  left: 12px;
  cursor: pointer;
  line-height: 32px;
  color: #707070;
}
.cg-next {
  position: absolute;
  top: 4px;
  right: 12px;
  cursor: pointer;
  line-height: 32px;
  color: #707070;
}
.cg-calendar-container {
  display: inline-block;
  margin: 3px;

  header {
    font-size: 17px;
    line-height: 32px;
    color: #5e7a88;
  }
}

.table {
  clear: both;
  width: 100%;
  margin-bottom:10px;
  border: 0;
  border-collapse: collapse;
  color: #444444;

  thead > tr > th {
    text-transform: uppercase;
    text-align: center;
    font-size: 0.7em;
    height: auto;
  }
}

.cg-day {
  width: 14.28571429%;
  text-align: center;
  vertical-align: middle;
  font-size: $font-size-small;
  cursor: pointer;
  padding: 0;
  height: 100%;

  span {
    padding: $padding-small-vertical * 0.8 $padding-small-horizontal * 0.8;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: inherit;
    line-height: $line-height-computed;
  }

  &:hover {
    background: $body-bg;
  }

  &.outside-month {
    color: lighten($brand-success, 33%);
    opacity: 0.5;
  }

  &.selected {
    background-color: $brand-success;
    color: darken($brand-success, 66%);
  }

  &.today {
    font-weight: bold;
  }

  &.ranged {
    background-color: darken($brand-success, 33%);
    color: #fff;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
