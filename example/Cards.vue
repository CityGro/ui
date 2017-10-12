<template>
  <div class="cards-example">
    <section-header :level="1">
      Cards
    </section-header>
    <draggable v-model="cards" class="cards">
      <card v-for="card in cards" :key="card.title">
        <h2 slot="title"> {{ card.title }} </h2>
        <p> {{ card.description }} </p>
        <button-menu slot="action">
          <a class="btn" :class="{'btn-primary': !yes, 'btn-success': yes}" @click="yes = !yes">
            {{ card.action }}
          </a>
          <div slot="menu">
            <a class="btn btn-block" :class="{'btn-primary': !yes, 'btn-success': yes}" @click="yes = !yes">
              {{ card.action }}
            </a>
            <a class="btn btn-block" :class="{'btn-primary': !yes, 'btn-success': yes}" @click="yes = !yes">
              {{ card.action }}
            </a>
          </div>
        </button-menu>
      </card>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
  .cards-example {
    margin-top: 1em;

    .cards {
      display: flex;
      flex-direction: row;
    }
  }
</style>

<script>
import ButtonMenu from '../ButtonMenu'
import Card from '../Card'
import Draggable from '../Draggable'
import SectionHeader from '../SectionHeader'

export default {
  components: {
    ButtonMenu,
    Card,
    Draggable,
    SectionHeader
  },
  data () {
    return {
      yes: false,
      cards: [
        {
          title: 'I AM CARD',
          description: 'HEAR ME ROAR',
          action: 'ACTION!'
        },
        {
          title: 'SO AM I',
          description: 'I CAN TOO',
          action: 'DO THE THING'
        }
      ]
    }
  }
}
</script>
