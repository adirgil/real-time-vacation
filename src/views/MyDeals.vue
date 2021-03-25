<template>
  <div>
    <h2>my deals</h2>
    <h3>{{ myDealsArr }}</h3>
  </div>
</template>

<script>
import firebaseDatabase from "@/middleware/firebase/database/realtime-db-index";

export default {
  name: "MyDeals",
  data() {
    return {
      myDealsArr: []
    }
  },
  created() {
    firebaseDatabase.read({entity: 'deals'}).then(allDeals => {
      console.log('deals: ', allDeals)
      console.log(window.user.uid)
      this.myDealsArr = allDeals.filter(deal => {
        return deal.userId === window.user.uid
      })
    })
  }
}
</script>

<style scoped>

</style>