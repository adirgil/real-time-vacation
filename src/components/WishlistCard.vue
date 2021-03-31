<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <div class="q-pa-md">
        <q-carousel
            class="img-style"
            animated
            v-model="slide"
            arrows
            navigation
            infinite
        >
          <q-carousel-slide v-for="(image, index ) of currentDeal.images" :name="doMath(index)" :img-src="image" :key="image"/>
        </q-carousel>
      </div>

      <q-card-section>
        <q-item-label overline>Seller: {{currentDeal.sellerName}}</q-item-label>
        <q-item-label overline>Phone Number: {{currentDeal.phone}}</q-item-label>
        <q-item-label overline>Airline: {{currentDeal.airline}}</q-item-label>
        <q-item-label overline>Stay Time: {{currentDeal.stayTime}} days</q-item-label>
        <q-item-label overline>Hotel: {{currentDeal.hotel}}</q-item-label>
        <q-item-label overline>Price: {{currentDeal.price}}$</q-item-label>

      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" />
      <q-btn flat>
        {{deal.date }} - {{deal.returnDate}}
      </q-btn>
      <q-btn flat>
        {{currentDeal.destination}}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "WishlistCard",
  props: ['deal'],
  data () {
    return {
      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      currentDeal: {}
    }
  },
  methods:{
    doMath: function (index) {
      return index+1
    }
  },
  created() {
    if (this.deal) {
      this.currentDeal = this.deal
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 90%
  margin-bottom: 15px
.img-style
  height: 170px
  width: 400px
</style>