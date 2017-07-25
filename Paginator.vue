<template>
  <div class="paginator text-right">
    <div v-if="value.total > 0" :style="{width: (90 + (value && value.page > 1 ? 40 : 0) + (value && indexOfLast < value.total ? 40 : 0)) + (value && value.total > 100 ? 40 : 0) + (value && value.page * value.per_page > 100 ? 20 : 0) + 'px'}">
      <button type="button" class="btn btn-default nav-arrow" v-if="value && value.page > 1" @click="pageBack">
        <i class="fa fa-angle-left fa-lg"/>
      </button>
      <span class="info-text">{{indexOfFirst}}<span class='cg-showing'>-{{indexOfLast}}</span> of {{value.total}}</span>
      <button type="button" class="btn btn-default nav-arrow" v-if="value && indexOfLast < value.total" @click="pageNext">
        <i class="fa fa-angle-right fa-lg"/>
      </button>
    </div>
  </div>
</template>

<script>
import toNumber from 'lodash/fp/toNumber'

export default {
  name: 'paginator',
  props: {
    value: {
      type: Object,
      default: () => ({
        page: 1,
        per_page: 25,
        total: 0
      })
    }
  },
  computed: {
    indexOfFirst () {
      return ((this.value.page - 1) * this.value.per_page) + 1
    },
    indexOfLast () {
      return (this.indexOfFirst + this.value.per_page - 1) >= this.value.total ? this.value.total : (this.indexOfFirst + this.value.per_page - 1)
    }
  },
  methods: {
    pageBack () {
      if (this.indexOfFirst > 1) {
        this.$emit('input', {...this.value, page: toNumber(this.value.page) - 1})
      }
    },
    pageNext () {
      if (this.indexOfLast < this.value.total) {
        this.$emit('input', {...this.value, page: toNumber(this.value.page) + 1})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-text {
  padding-right: 5px;
}
</style>
