<template>
  <div style="background-color: #f1f2f8">
    <q-item-section avatar style="display: flex">
      <q-btn no-caps flat round icon="assignment" rounded text-color="none" class="header">
        My Deals
      </q-btn>
    </q-item-section>
    <div class="q-pa-md" style="max-width: 80%">
      <q-list bordered padding v-for="(deal, key) of myDealsArr" :key="key">
        <q-item>
          <q-item-section>
            <q-item-label style="font-size: 1.5rem" overline>{{deal.destination}}</q-item-label>
            <q-item-label>{{deal.date}} - {{deal.returnDate}}</q-item-label>
            <q-item-label caption>purchase cost: {{deal.purchaseCost}}. purchase price: {{deal.price}}.</q-item-label>
            <q-item-label caption>stay time: {{deal.stayTime}} days. hotel: {{deal.hotel}}.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>Created at: {{deal.createdOn}}</q-item-label>
            <div style="display: flex; margin-top: 50px">
              <q-btn style="margin-right: 10px" size="sm" icon="edit" rounded color="blue" @click="goToDealInfo(deal.id)"/>
              <q-btn size="sm" icon="delete" rounded color="red" @click="confirm = true" />
              <q-dialog v-model="confirm" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <span>This action will delete your Deal permanently! procced?</span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn no-caps flat label="Cancel" color="primary" v-close-popup />
                    <q-btn no-caps flat label="Delete" color="primary" @click="removeDeal(deal.id)" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import firebaseDatabase from "@/middleware/firebase/database/realtime-db-index";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "MyDeals",
  computed: mapState('deals', ['deals']),
  data() {
    return {
      myDealsArr: [],
      confirm:false
    }
  },
  methods:{
    ...mapActions('deals', ['deleteDeal']),
    ...mapMutations('deals', ["setEditedDealId"]),
    goToDealInfo(id){
      this.$router.push(`/deal-information/${id}`)
    },
    async removeDeal(id){
      this.setEditedDealId(id)
      await this.deleteDeal()
      this.localRead()
    },
    localRead(){
      this.myDealsArr = this.deals.filter(deal => {
        return deal.userId === window.user.uid
      })
    }
  },
  created() {
    this.localRead()
    // firebaseDatabase.read({entity: 'deals'}).then(allDeals => {
    //   console.log('deals: ', allDeals)
    //   console.log(window.user.uid)
    //   this.myDealsArr = allDeals.filter(deal => {
    //     return deal.userId === window.user.uid
    //   })
    // })
  }
}
</script>

<style lang="sass" scoped>
.header
  font-size: 30px
  padding: 10px
</style>