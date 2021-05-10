<template>
  <div style="background-color: #f1f2f8">
    <AddDeal v-if="dataForInputs && deal.userId === windowUserId" :tableName="this.tableName" :deal="this.deal"/>
    <div class="q-pa-md ">
      <div class="carousel-div">
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
        <div class="details">
          <div class="single-div-detail">
            <span><img class="carusel-icons" src="../assets/map-pin.svg"></span>
            <div class="q-md text-center">
              Destination: {{ deal.destination }}<br>
              Airline: {{ deal.airline }}<br>
              Date: {{ deal.date }}<br>
              Return Date: {{ deal.returnDate }}<br>
              Stay Time: {{ deal.stayTime }}
            </div>
          </div>
          <div class="single-div-detail">
            <span><img class="carusel-icons" src="../assets/review.svg"></span>
            <div class="q-md text-center">
              Hotel: {{ deal.hotel }}
            </div>
          </div>
          <div class="single-div-detail">
            <span><img class="carusel-icons" src="../assets/money.svg"></span>
            <div class="q-md text-center">
              Purchase Cost: {{ deal.purchaseCost }}$<br>
              Price: {{ deal.price }}$
            </div>
          </div>
          <div class="single-div-detail">
            <span><img class="carusel-icons" src="../assets/man.svg"></span>
            <div class="q-md text-center">
              Name: {{ deal.sellerName }}<br>
              Phone: {{ deal.phone }}
            </div>
          </div>
        </div>

        <div class="details-mobile">
              <q-list bordered padding>

                <q-item-label header>Details</q-item-label>

                <q-item>
                  <q-item-section avatar>
                    <img class="carusel-icons" src="../assets/map-pin.svg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Destination: {{ deal.destination }}</q-item-label>
                    <q-item-label>Airline: {{ deal.airline }}</q-item-label>
                    <q-item-label>Date: {{ deal.date }} - {{ deal.returnDate }}</q-item-label>
                    <q-item-label>Stay Time: {{ deal.stayTime }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <img class="carusel-icons" src="../assets/review.svg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Hotel: {{ deal.hotel }}</q-item-label>
                  </q-item-section>

                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <img class="carusel-icons" src="../assets/money.svg">
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Purchase Cost: {{ deal.purchaseCost }}$</q-item-label>
                    <q-item-label>Price: {{ deal.price }}$</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section top avatar>
                    <q-avatar>
                      <img class="carusel-icons" src="../assets/man.svg">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Name: {{ deal.sellerName }}</q-item-label>
                    <q-item-label>Phone: {{ deal.phone }}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
        </div>
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
      windowUserId: ''
    }
  },
  methods: {
    doMath: function (index) {
      return index + 1
    },
    getDealById() {
      this.deal = this.deals.filter(d => d.id === this.$route.params.id)[0]
      this.windowUserId = window.user.uid
      this.dataForInputs = true

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

.details
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  padding: 10px 0px
  background-color: #02122c
  opacity: 0.9

.single-div-detail
  display: grid
  justify-items: center
  color: #FF7B59

.details-mobile
  display: none
.carousel-div
  width: 70%
  margin-left: 15%

@media only screen and (max-width: 700px)
  .details
    display: none
  .details-mobile
    display: block
  .carousel-div
    width: 100%
    margin: 0

</style>