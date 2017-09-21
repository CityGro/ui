<template>
  <div class="modal-content">
    <slot name="header">
      <modal-header @close="$parent.dismiss"> Example </modal-header>
    </slot>
    <slot>
      <div class="modal-body">
        Check the <a href="https://gitlab.com/citygro/ui" target="_blank">docs</a> for details :)
      </div>
    </slot>
    <slot name="footer">
      <footer class="modal-footer">
        <button class="btn btn-primary" @click="$parent.dismiss"> OK </button>
      </footer>
    </slot>
  </div>
</template>

<script>
import ModalHeader from './ModalHeader'

export default {
  name: 'ui-modal',
  components: {ModalHeader}
}
</script>
