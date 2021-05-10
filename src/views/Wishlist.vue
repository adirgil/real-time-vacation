<template>
  <div class="q-pa-md wishlist-main">
    <q-item-section avatar style="display: flex">
      <q-btn no-caps flat round color="red" icon="favorite" rounded text-color="none" class="header">
        My Wishlist
      </q-btn>
    </q-item-section>

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
    console.log(this.arrayOfWishlist,'wishlist')
  }
}
</script>

<style lang="sass" scoped>
.wishlist-main
  background-color: #f1f2f8
.header
  font-size: 30px
  padding: 10px
</style>