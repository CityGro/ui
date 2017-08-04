<template>
  <div class="menus-sample">
    <section-header :level="1"> Menus </section-header>
    <div>
      <button-menu>
        <a class="btn btn-link"> I can do things! </a>
        <a slot="toggle" class="btn btn-link">
          <i class="fa fa-caret-down" />
          <span class="sr-only"> toggle dropdown </span>
        </a>
        <ul slot="menu" class="mmm">
          <li>
            <a class="btn btn-link btn-block">
              Anything you can do
            </a>
          </li>
          <li class="divider" role="separator"></li>
          <li>
            <a class="btn btn-link btn-block">
              I can do better
            </a>
          </li>
        </ul>
      </button-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menus-sample {
    margin-top: 1em;
  }

  .mmm {
    padding: 0;
    margin: 0;
  }
</style>

<script>
import SectionHeader from '../SectionHeader'
import ButtonMenu from '../ButtonMenu'

export default {
  name: 'menus-sample',
  components: {
    SectionHeader,
    ButtonMenu
  }
}
</script>
