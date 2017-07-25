// @flow

import Vue from 'vue'
import isArray from 'lodash/fp/isArray'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import flattenDeep from 'lodash/fp/flattenDeep'
import entries from 'lodash/fp/entries'

/**
 * @param {Object<string, array|string>} value
 */
export default Vue.component('d-list', {
  render (createElement) {
    return createElement('dl', flow(
      entries,
      map(([key, value]) => [
        createElement('dt', `${key}:`),
        map((v) => createElement('dd', v))((isArray(value) ? value : [value]))
      ]),
      flattenDeep,
    )(this.value))
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
})
