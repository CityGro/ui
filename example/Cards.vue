<template>
  <div class="cards-example">
    <section-header :level="1">
      Cards
    </section-header>
    <div class="cards">
      <card v-for="card in cards" :key="card.title">
        <h2 slot="title"> {{ card.title }} </h2>
        <p> {{ card.description }} </p>
        <a slot="action" class="btn" :class="{'btn-primary': !yes, 'btn-success': yes}" @click="yes = !yes">
          {{ card.action }}
        </a>
      </card>
    </div>
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
import SectionHeader from '../SectionHeader'
import Card from '../Card'

export default {
  components: {
    SectionHeader,
    Card
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
