<template>
  <row>
    <column :size="value.frequency == 'EVERY' ? 5 : 6" :class="{'has-error': frequencyError}">
      <select class="form-control" :value="value.frequency" @change="setProps({frequency: $event.target.value})">
        <option value="EVERY">Run Every</option>
        <option value="ONCE">Run At</option>
      </select>
      <span class="help-block" v-if="frequencyError" v-for="error in frequencyError">{{ error }}</span>
    </column>
    <column :size="value.frequency == 'EVERY' ? 3 : 6" :class="{'has-error': nError || frequencyError}">
      <div class="input-group">
        <input
          class="form-control"
          :value="value.n"
          placeholder="?"
          @input="setProps({n: $event.target.value})"
        />
        <span class="input-group-addon">{{noun}}{{value.n > 1 ? 's' : ''}}</span>
      </div>
      <span class="help-block" v-if="nError" v-for="error in nError">{{ error }}</span>
    </column>
    <column :size="4" v-if="value.frequency == 'EVERY'" :class="{'has-error': startError}">
      <div class="input-group">
        <span class="input-group-addon">start at {{noun}} #</span>
        <input
          class="form-control"
          :value="value.start"
          placeholder="?"
          @input="setProps({start: $event.target.value})"
        />
      </div>
      <span class="help-block" v-if="startError" v-for="error in startError">{{ error }}</span>
    </column>
  </row>
</template>

<script>
import flow from 'lodash/fp/flow'
import filter from 'lodash/fp/filter'
import first from 'lodash/fp/first'
import Well from 'ui/Well'
import SelectDropdown from 'ui/SelectDropdown'
import Row from 'ui/Row'
import Column from 'ui/Column'

export default {
  name: 'select-trigger-occur',
  components: {
    Well,
    SelectDropdown,
    Row,
    Column
  },
  data () {
    return {
      options: [
        {
          key: 'Send At',
          value: 'ONCE'
        },
        {
          key: 'Send Every',
          value: 'EVERY'
        }
      ]
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        frequency: 'ONCE',
        n: 1,
        start: 1
      })
    },
    noun: {
      type: String,
      default: 'occurrence'
    },
    errors: {
      type: [Boolean, Object],
      default: false
    }
  },
  methods: {
    setProps (obj) {
      let value = {...this.value, ...obj}
      if (value.frequency === 'ONCE' && typeof value.start !== 'undefined') {
        delete value.start
      }
      if (value.frequency === 'EVERY' && !value.start) {
        value.start = 1
      }
      if (typeof value.start !== 'undefined' && !value.start || isNaN(value.start * 1)) {
        delete value.start
      }
      if (typeof value.n !== 'undefined' && !value.n || isNaN(value.n * 1)) {
        delete value.n
      }
      this.$emit('input', value)
    }
  },
  computed: {
    frequency () {
      return flow(filter((option) => option.value === this.value.frequency), first)(this.options)
    },
    frequencyError () {
      return this.errors['frequency'] || false
    },
    nError () {
      return this.errors['n'] || false
    },
    startError () {
      return this.errors['start'] || false
    }
  }
}
</script>
