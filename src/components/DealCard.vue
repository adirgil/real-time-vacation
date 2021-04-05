<template>
  <q-card class="my-card bg-mycolor">
    <q-img :src="url" style="max-height: 150px">
      <div class="absolute-bottom" style="padding: 0px 0px 0px 10px">
        <div class="text-h6">{{ this.currentDeal.destination }}</div>
        <div class="text-subtitle2">{{ this.currentDeal.sellerName }}</div>
      </div>
    </q-img>
    <q-card-section class="q-pt-none no-padding">
      <q-item class="single-item">
        <q-item-section avatar class="card-icons">
          <q-icon color="blue-grey-6" name="date_range"/>
        </q-item-section>
        <q-item-section class="white-text">{{ this.currentDeal.date }} - {{this.currentDeal.returnDate}}</q-item-section>
        <q-btn @click="changeFavorite(currentDeal.id)" flat round :color="this.iconColor" icon="favorite" rounded>
          <q-tooltip
              transition-show="scale"
              transition-hide="scale"
              anchor="top middle"
              self="bottom middle"
          >
            {{ `${favoriteTooltip}!` }}
          </q-tooltip>
        </q-btn>
      </q-item>

      <q-item class="single-item">
        <q-item-section avatar class="card-icons">
          <q-icon color="blue-grey-6" name="flight_takeoff"/>
        </q-item-section>
        <q-item-section class="white-text">{{ this.currentDeal.airline }}</q-item-section>
      </q-item>

      <q-item class="single-item">
        <q-item-section avatar class="card-icons">
          <q-icon color="blue-grey-6" name="attach_money"/>
        </q-item-section>
        <q-item-section class="white-text">{{ this.currentDeal.price }}</q-item-section>
      </q-item>


    </q-card-section>
    <q-card-actions>
      <q-btn flat no-caps class="orange-text glossy" @click="goToDealInfo(currentDeal.id)">More info</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/storageIndex'
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: "DealCard",
  props: ['deal','favoriteChanged'],
  data() {
    return {
      favoriteTooltip: '',
      url: '',
      iconColor: '',
      currentDeal: {},
      wlArray: []
    }
  },
  methods: {
    ...mapActions('deals', ['getDeals', 'updateWishlist']),
    refresh() {
      if(this.currentDeal.images){
        this.url = this.currentDeal.images[0]
      }else{
        this.url = 'https://placeimg.com/500/300/nature?t=' + Math.random()
      }
    },
    goToDealInfo(id) {
      this.$router.push(`/deal-information/${id}`)
    },
    changeFavorite(id) {
      if(!this.currentDeal.isFavorite){
        this.iconColor = 'red'
        this.favoriteTooltip = 'remove from favorite'
      }else{
        this.iconColor = 'grey'
        this.favoriteTooltip = 'add to favorite'
      }
      this.updateWishlist(id)
    }
  },
  created() {
    if (this.deal) {
      this.currentDeal = this.deal
      if(this.currentDeal.isFavorite){
        this.iconColor = 'red'
        this.favoriteTooltip = 'remove from favorite'
      }else{
        this.iconColor = 'grey'
        this.favoriteTooltip = 'add to favorite'
      }
    }
    this.refresh()

  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 250px

.single-item
  padding: 0
  min-height: 30px

.orange-text
  color: #FF7B59

.bg-mycolor
  background-color: #02122c

.white-text
  color: white

.card-icons
  padding: 0px
  min-width: 30px

@media only screen and (max-width: 700px)
  .my-card
    width: 350px
</style>