<template>
  <row>
    <column
      v-if="years"
      :size="size">
      <div :class="{'input-group': true, 'has-error': yearsError}">
        <input class="form-control" placeholder="0" :value="value.years || 0" @input="setProps({years: $event.target.value})"/>
        <span class="input-group-addon">year{{value.years && value.years == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="yearsError" v-for="error in yearsError">{{ error }}</span>
    </column>
    <column
      v-if="months"
      :size="size">
      <div :class="{'input-group': true, 'has-error': monthsError}">
        <input class="form-control" placeholder="0" :value="value.months || 0" @input="setProps({months: $event.target.value})"/>
        <span class="input-group-addon">month{{value.months && value.months == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="monthsError" v-for="error in monthsError">{{ error }}</span>
    </column>
    <column
      v-if="weeks"
      :size="size">
      <div :class="{'input-group': true, 'has-error': weeksError}">
        <input class="form-control" placeholder="0" :value="value.weeks || ''" @input="setProps({weeks: $event.target.value})"/>
        <span class="input-group-addon">week{{value.weeks && value.weeks == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="weeksError" v-for="error in weeksError">{{ error }}</span>
    </column>
    <column
      v-if="days"
      :size="size">
      <div :class="{'input-group': true, 'has-error': daysError}">
        <input class="form-control" placeholder="0" :value="value.days || ''" @input="setProps({days: $event.target.value})"/>
        <span class="input-group-addon">day{{value.days && value.days == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="daysError" v-for="error in daysError">{{ error }}</span>
    </column>
    <column
      v-if="hours"
      :size="size">
      <div :class="{'input-group': true, 'has-error': hoursError}">
        <input class="form-control" placeholder="0" :value="value.hours || ''" @input="setProps({hours: $event.target.value})"/>
        <span class="input-group-addon">hour{{value.hours && value.hours == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="hoursError" v-for="error in hoursError">{{ error }}</span>
    </column>
    <column
      v-if="minutes"
      :size="size">
      <div :class="{'input-group': true, 'has-error': minutesError}">
        <input class="form-control" placeholder="0" :value="value.minutes || ''" @input="setProps({minutes: $event.target.value})"/>
        <span class="input-group-addon">minute{{value.minutes && value.minutes == 1 ? '' : 's'}}</span>
      </div>
      <span class="help-block" v-if="minutesError" v-for="error in minutesError">{{ error }}</span>
    </column>
  </row>
</template>
<script>
import Column from 'ui/Column'
import Row from 'ui/Row'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import sum from 'lodash/fp/sum'
import round from 'lodash/fp/round'

export default {
  components: {
    Column,
    Row
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        minutes: ''
      })
    },
    errors: {
      default: () => ({})
    },
    years: {
      type: Boolean,
      default: false
    },
    months: {
      type: Boolean,
      default: false
    },
    weeks: {
      type: Boolean,
      default: false
    },
    days: {
      type: Boolean,
      default: true
    },
    hours: {
      type: Boolean,
      default: true
    },
    minutes: {
      type: Boolean,
      default: true
    },
    columns: {
      default: 'auto'
    }
  },
  methods: {
    setProps (obj) {
      // Ensure all are numbers
      let value = {...this.value, ...obj}
      Object.keys(value).forEach((k) => {
        if (value[k] === '') {
          delete value[k]
          return
        }
        if (!value[k] || isNaN(value[k] * 1)) {
          if (this.value[k] && !isNaN(this.value[k])) {
            value[k] = this.value[k]
          } else {
            delete value[k]
            return
          }
        }
        value[k] = Math.round(1 * value[k])
      })
      this.$emit('input', value)
    }
  },
  computed: {
    size () {
      if (this.columns === 'auto') {
        return flow(
          map((interval) => (interval) ? 1 : 0),
          sum,
          (columns) => {
            const size = round(12 / columns)
            // TODO check for invalid sizes
            return size
          }
        )([this.years, this.months, this.weeks, this.days, this.hours, this.minutes])
      } else {
        return this.columns
      }
    },
    yearsError () {
      return this.errors['years'] || false
    },
    monthsError () {
      return this.errors['months'] || false
    },
    weeksError () {
      return this.errors['weeks'] || false
    },
    daysError () {
      return this.errors['days'] || false
    },
    hoursError () {
      return this.errors['hours'] || false
    },
    minutesError () {
      return this.errors['minutes'] || false
    }
  }
}
</script>
