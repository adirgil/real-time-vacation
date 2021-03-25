<template>
  <div>
    <AddDeal v-if="dataForInputs" :tableName="this.tableName" :deal="this.deal"/>
    <div class="q-pa-md">
      <div class="">
        <q-carousel
            swipeable
            animated
            v-model="picSlide"
            thumbnails
            infinite
            class="shadow-1 rounded-borders"
            v-if="deal.imgUrl1"
        >
          <q-carousel-slide :name="1" :img-src="deal.imgUrl1"/>
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg"/>
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg"/>
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg"/>
        </q-carousel>
        <q-toolbar class="bg-primary text-white shadow-2 rounded-borders details-section">
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <img class="carusel-icons" src="../assets/map-pin.svg">
            <div class="q-mt-md text-center">
              Destination: {{ deal.destination }}<br>
              Airline: {{ deal.airline }}<br>
              Date: {{ deal.date }}<br>
              Return Date: {{ deal.returnDate }}<br>
              Stay Time: {{ deal.stayTime }}
            </div>
          </q-carousel-slide>

          <q-separator dark vertical inset/>

          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <img class="carusel-icons" src="../assets/review.svg">
            <div class="q-mt-md text-center">
              Hotel: {{ deal.hotel }}
            </div>
          </q-carousel-slide>

          <q-separator dark vertical inset/>

          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <img class="carusel-icons" src="../assets/money.svg">
            <div class="q-mt-md text-center">
              Purchase Cost: {{ deal.purchaseCost}}$<br>
              Price: {{ deal.price}}$
            </div>
          </q-carousel-slide>

          <q-separator dark vertical inset/>

          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <img class="carusel-icons" src="../assets/man.svg">
            <div class="q-mt-md text-center">
              Name: {{ deal.sellerName }}<br>
              Phone: {{ deal.phone }}
            </div>
          </q-carousel-slide>
        </q-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/storageIndex'
import apiIndex from "@/middleware/api/apiIndex";
import AddDeal from "@/components/AddDeal";
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'

export default {
  name: "DealInformation",
  components: {AddDeal},
  data() {
    return {
      deal: {},
      picSlide: 1,
      slide: 'style',
      tableName: 'deals',
      dataForInputs: false
    }
  },
  methods: {
    getDealById() {
      firebaseDatabase.readSingleDocById({entity: this.tableName, id: this.$route.params.id})
          .then(res => {
            this.deal = res
            this.deal.id = this.$route.params.id
            this.dataForInputs = true
            console.log(this.deal)

          })
      //this.deal = localStorageDriver.getDealById(this.tableName, this.$route.params.id)
    },
  },
  created() {
    this.getDealById();
  }
}
</script>

<style lang="sass" scoped>
.carusel-icons
  height: 50px
  width: 50px

.details-section
  display: grid
  grid-template-columns: 25%
  grid-auto-flow: column
  justify-content: space-around

</style>