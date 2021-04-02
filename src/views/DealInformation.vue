<template>
  <div style="background-color: #f1f2f8">
    <AddDeal v-if="dataForInputs && deal.userId === windowUserId" :tableName="this.tableName" :deal="this.deal"/>
    <div class="q-pa-md">
      <div class="">
        <q-carousel
            swipeable
            animated
            v-model="picSlide"
            thumbnails
            infinite
            class="shadow-1 rounded-borders"
            v-if="deal.images"
        >
          <q-carousel-slide v-for="(image, index ) of deal.images" :name="doMath(index)" :img-src="image" :key="image"/>
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
import {mapState} from "vuex";

export default {
  name: "DealInformation",
  computed: mapState('deals', ['editedDeal', 'deals']),
  components: {AddDeal},
  data() {
    return {
      deal: {},
      picSlide: 1,
      slide: 'style',
      tableName: 'deals',
      dataForInputs: false,
      windowUserId:''
    }
  },
  methods: {
    doMath: function (index) {
      return index+1
    },
    getDealById() {
      this.deal = this.deals.filter(d=>d.id === this.$route.params.id)[0]
      console.log(this.deal.userId)
      console.log(window.user.uid)
      this.windowUserId = window.user.uid
      this.dataForInputs = true
      // firebaseDatabase.readSingleDocById({entity: this.tableName, id: this.$route.params.id})
      //     .then(res => {
      //       this.deal = res
      //       this.deal.id = this.$route.params.id
      //       this.dataForInputs = true
      //       console.log(this.deal)
      //
      //     })
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