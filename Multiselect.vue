<template>
  <multiselect
    @input="$emit('input', $event)"
    @select="$emit('select', $event)"
    @remove="$emit('remove', $event)"
    @search-change="$emit('search-change', $event)"
    @tag="$emit('tag', $event)"
    @open="$emit('open', $event)"
    @close="$emit('close', $event)"
    :id="id"
    :options="options"
    :value="value"
    :multiple="multiple"
    :trackBy="trackBy"
    :label="label"
    :searchable="searchable"
    :clearOnSelect="clearOnSelect"
    :hideSelected="hideSelected"
    :placeholder="placeholder"
    :allowEmpty="allowEmpty"
    :resetAfter="resetAfter"
    :closeOnSelect="closeOnSelect"
    :customLabel="customLabel"
    :taggable="taggable"
    :tagPlaceholder="tagPlaceholder"
    :max="max"
    :optionsLimit="optionsLimit"
    :groupValues="groupValues"
    :groupLabel="groupLabel"
    :blockKeys="blockKeys"
    :internalSearch="internalSearch"
    :selectLabel="selectLabel"
    :selectedLabel="selectedLabel"
    :deselectLabel="deselectLabel"
    :showLabels="showLabels"
    :limit="limit"
    :limitText="limitText"
    :loading="loading"
    :disabled="disabled"
    :maxHeight="maxHeight"
    :showPointer="showPointer"
  />
</template>

<style lang="scss">
  @mixin depth {
    box-shadow: 1px 1px 5px rgba(#000, 0.33);
    border: 1px solid $bg;
  }

  .has-warning .multiselect,
  .has-warning .multiselect__tags {
    border-color: $state-warning-text !important;

    .multiselect__select {
      border-bottom-color: $state-warning-text !important;
    }

    &.multiselect--active {
      .multiselect__select {
        border-top-color: $state-warning-text !important;
        border-right-color: $state-warning-text !important;
      }
    }
  }
  .has-error .multiselect,
  .has-error .multiselect__tags {
    border-color: $state-danger-text !important;

    .multiselect__select {
      border-bottom-color: $state-danger-text !important;
    }

    &.multiselect--active {
      .multiselect__select {
        border-top-color: $state-danger-text !important;
        border-right-color: $state-danger-text !important;
      }
    }
  }
  .has-success .multiselect,
  .has-success .multiselect__tags {
    border-color: $state-success-text !important;

    .multiselect__select {
      border-bottom-color: $state-success-text !important;
    }

    &.multiselect--active {
      .multiselect__select {
        border-top-color: $state-success-text !important;
        border-right-color: $state-success-text !important;
      }
    }
  }

  .multiselect {
    min-height: 36px !important;

    .multiselect__select {
      height: 36px;
      width: 32px;
      background-image: url(~assets/images/dropdown-arrow.png);
      top: 0;
      transition: none;
      border-left: 1px solid $gray-lighter;
      border-bottom: 1px solid $gray-lighter;
      border-bottom-right-radius: $border-radius-base;

      &::before {
        display: none;
      }
    }

    &.multiselect--active {
      z-index: $zindex-dropdown;

      .multiselect__select {
        border-right: 1px solid $gray-lighter;
        border-top: 1px solid $gray-lighter;
        border-top-left-radius: $border-radius-base;
        border-bottom-left-radius: $border-radius-base;
        border-bottom-right-radius: 0;
        border-left: 0;
        right: 0;
      }
    }

    .multiselect__tags {
      border-radius: $border-radius-base !important;
      border-color: $gray-lighter;
      min-height: 36px;
      padding-top: $padding-base-vertical + 2px;
      padding-left: $padding-base-horizontal;

      input,
      .multiselect__single {
        padding: 0;
        margin-bottom: 0;
      }
    }

  .multiselect__content {
    $indicator: 0.66em;

    top: calc(100% + 0.5em);
    border-radius: $border-radius-base;
    box-shadow: 1px 1px $border-radius-base rgba(#000, 0.33);
    z-index: $zindex-dropdown;

    .multiselect__element:first-child {
      border-top-left-radius: $border-radius-base;
      border-top-right-radius: $border-radius-base;
    }
  }

    .multiselect__option--highlight.multiselect__option--selected,
    .multiselect__option--highlight.multiselect__option--selected::after,
    .multiselect__option--highlight,
    .multiselect__option--highlight::after {
      background: $body-bg;
      color: $text-color;
    }

    .multiselect__option--selected,
    .multiselect__option--selected:hover,
    .multiselect__option--selected::after {
      background: $brand-primary !important;
      color: #fff !important;
    }
    .multiselect__option--selected::after {
      display: none;
    }
    .multiselect__option--highlight::after {
      display: none;
    }
  }
</style>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'ui-multiselect',
  components: {Multiselect},
  props: {
    id: {type: [Number, String]},
    options: {type: Array},
    value: {type: [Number, Array, String, Object]},
    multiple: {type: Boolean, default: false},
    trackBy: {type: String},
    label: {type: String},
    searchable: {type: Boolean, default: false},
    clearOnSelect: {type: Boolean, default: true},
    hideSelected: {type: Boolean, default: false},
    placeholder: {type: String, default: 'Select option'},
    allowEmpty: {type: Boolean, default: true},
    resetAfter: {type: Boolean, default: false},
    closeOnSelect: {type: Boolean, default: true},
    customLabel: {type: Function},
    taggable: {type: Boolean, default: false},
    tagPlaceholder: {type: String, default: 'Press enter to create a tag'},
    max: {type: Number},
    optionsLimit: {type: Number, default: 1000},
    groupValues: {type: String},
    groupLabel: {type: String},
    blockKeys: {type: Array, default: () => ([])},
    internalSearch: {type: Boolean, default: true},
    selectLabel: {type: String, default: 'Press enter to select'},
    selectedLabel: {type: String, default: 'Selected'},
    deselectLabel: {type: String, default: 'Press enter to remove'},
    showLabels: {type: Boolean, default: true},
    limit: {type: Number, default: 99999},
    limitText: {type: Function, default: () => (count) => `and ${count} more`},
    loading: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    maxHeight: {type: Number, default: 300},
    showPointer: {type: Boolean, default: true}
  }
}
</script>
