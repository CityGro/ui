<template>
  <table class="ui-simple-calendar table">
    <tr class="weekdays" v-if="enableDaysOfWeek">
      <th v-for="weekDay in weekDays" class="weekday">
        {{weekDay.format('ddd')}}
      </th>
    </tr>
    <tr v-for="week in calendarMonthWeeks" class="week">
      <td
        v-for="day in week"
        :class="showSelected(day)"
        @click="selectDate($event)">
        <time
          v-if="day"
          :datetime="day.toISOString()">
          {{day.format('D')}}
        </time>
      </td>
    </tr>
  </table>
</template>

<script>
import moment from 'moment'
import map from 'lodash/fp/map'
import rangeRight from 'lodash/fp/rangeRight'
import $ from 'jquery'

/**
 * @module ui/SimpleCalendar
 *
 * ```html
 * <calendar v-model="date" :enableOutsideDays="false" />
 * ```
 */
export default {
  props: {
    value: {
      type: String,
      default: () => moment().toISOString()
    },
    enableDaysOfWeek: {
      type: Boolean,
      default: true
    },
    enableOutsideDays: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectDate (event) {
      const time = $(event.target).closest('.day').children('time').first().attr('datetime')
      this.$emit('input', time)
    },
    showSelected (day) {
      return {
        day: true,
        selected: (day) ? (day.date() === moment(this.value).date()) : false
      }
    }
  },
  computed: {
    weekDays () {
      return map((i) => moment().weekday(i))(rangeRight(7, 0))
    },
    /**
     * @see {@link https://github.com/airbnb/react-dates/blob/master/src/utils/getCalendarMonthWeeks.js}
     */
    calendarMonthWeeks () {
      const baseDate = moment(this.value)
      const firstOfMonth = baseDate.clone().startOf('month').hour(12)
      const lastOfMonth = baseDate.clone().endOf('month').hour(12)
      const currentDay = firstOfMonth.clone()
      let currentWeek = []
      let weeksInMonth = []
      for (let i = 0; i < currentDay.weekday(); i++) {
        const prevDay = this.enableOutsideDays && currentDay.clone().subtract(i + 1, 'day')
        currentWeek.unshift(prevDay)
      }
      // eslint-disable-next-line no-unmodified-loop-condition
      while (currentDay < lastOfMonth) {
        currentWeek.push(currentDay.clone())
        currentDay.add(1, 'day')
        if (currentDay.weekday() === 0) {
          weeksInMonth.push(currentWeek)
          currentWeek = []
        }
      }
      // weekday() returns the index of the day of the week according to the locale
      // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
      if (currentDay.weekday() !== 0) {
        // days belonging to the next month
        for (let k = currentDay.weekday(), count = 0; k < 7; k++, count++) {
          const nextDay = this.enableOutsideDays && currentDay.clone().add(count, 'day')
          currentWeek.push(nextDay)
        }
        weeksInMonth.push(currentWeek)
      }
      return weeksInMonth
    }
  }
}

</script>

<style lang="scss" scoped>
  .ui-simple-calendar {
    text-align: center;

    border: none;
    margin: 0;

    .weekdays,
    .week {
      height: auto;
    }

    .weekday,
    .day {
      text-align: center;
      border: none;
      padding: 0;
      margin: 0;
    }

    .day {
      cursor: pointer;

      time {
        $size: 2em;

        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;
        width: $size;
        height: $size;
        line-height: $size;
      }

      &:hover time,
      &.selected time {
        color: $bg2;
        background-color: $brand-success;
      }
    }
  }
</style>
