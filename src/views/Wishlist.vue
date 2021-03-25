<template>
  <div class="q-pa-md">
    <h4>WISHLIST</h4>
    <WishlistCard v-for="(deal, key) of arrayOfWishlist" :key="key"
                  :deal="deal"/>
  </div>
</template>

<script>
import WishlistCard from "@/components/WishlistCard";
import localStorageDriver from '../middleware/local-storage/storageIndex'
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: "Wishlist",
  computed: mapState('deals', ['deals', 'wishlistArray']),
  data() {
    return {
      arrayOfWishlist: []
    }
  },
  components: {WishlistCard},
  created() {
    this.arrayOfWishlist = this.deals.filter(deal => this.wishlistArray.includes(deal.id))
    console.log(this.arrayOfWishlist,'ff')
    //const wishlistIds = localStorageDriver.selectAllWishListIds()
    //const allDeals = localStorageDriver.selectAllDeals('dealsTable')
    // firebaseDatabase.read({entity: 'deals'}).then(allDeals => {
    //   console.log('deals: ', allDeals)
    //   firebaseDatabase.getWishListArray({id: window.user.uid}).then(wishlist => {
    //     this.wishlistArray = allDeals.filter(deal => {
    //       return wishlist.includes(deal.id)
    //     })
    //   })
    // })
  }
}
</script>

<style scoped>

</style>