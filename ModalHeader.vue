<template>
  <div class="ui-modal-header modal-header">
    <a class="close" @click="$emit('close') && $emit('dismiss')">
      <icon name="times" />
    </a>
    <h3 class="modal-title ui-pretty-overflow">
      <slot />
    </h3>
    <slot name="extra" />
  </div>
</template>

<script>
import Icon from './Icon'

/**
 * @fires ModalHeader#close
 */
export default {
  name: 'ui-modal-header',
  components: {
    Icon
  }
}
</script>
