<template>
  <div class="q-pa-md">
    <q-table
        title="Deals"
        :data="deals"
        :columns="columns"
        row-key="name"
        no-data-label="No deals was found"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="sellerName" :props="props" @click="goToDealInfo(props.row.id)">{{ props.row.sellerName }}</q-td>
          <q-td key="destination" :props="props">{{ props.row.destination }}</q-td>
          <q-td key="airline" :props="props">{{ props.row.airline }}</q-td>
          <q-td key="date" :props="props">{{ props.row.date }}</q-td>
          <q-td key="returnDate" :props="props">{{ props.row.returnDate }}</q-td>
          <q-td key="stayTime" :props="props">{{ props.row.stayTime }}</q-td>
          <q-td key="hotel" :props="props">{{ props.row.hotel }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td key="price" :props="props">{{ props.row.price }} $</q-td>
          <q-td key="createdOn" :props="props">{{ props.row.createdOn }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn @click="remove(props.row.id)" size="10px" round color="red" icon="delete" />
          </q-td>
        </q-tr>
      </template>

      <template v-slot:header-cell-airline="props">
        <q-th :props="props">
          <q-icon name="flight_takeoff" size="1.5em"/>
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-date="props">
        <q-th :props="props">
          <q-icon name="date_range" size="1.5em"/>
          {{ props.col.label }}
        </q-th>
      </template>
      <template v-slot:header-cell-returnDate="props">
        <q-th :props="props">
          <q-icon name="date_range" size="1.5em"/>
          {{ props.col.label }}
        </q-th>
      </template>
    </q-table>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/storageIndex'
import apiIndex from "@/middleware/api/apiIndex";
import api from "@/middleware/api/apiIndex";
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapState, mapActions, mapMutations} from 'vuex'


export default {
  name: "AdminTable",
  props: ['tableName' , 'isReload'],
  computed: mapState('deals', ['editedDeal', 'deals']),
  data() {
    return {
      columns: [
        {
          name: 'sellerName',
          required: true,
          label: 'Seller',
          align: 'left',
          field: 'sellerName',
          format: val => `${val}`
        },
        {name: 'destination', align: 'left', label: 'Destination', field: 'destination'},
        {name: 'airline', align: 'left', label: 'Airline', field: 'airline', sortable: true},
        {name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true},
        {name: 'returnDate', align: 'left', label: 'Return Date', field: 'returnDate', sortable: true},
        {name: 'stayTime', align: 'left', label: 'Stay Time (days)', field: 'stayTime', format: val => `${val} Days`},
        {name: 'hotel', align: 'left', label: 'Hotel', field: 'hotel'},
        {name: 'phone', align: 'left', label: 'Phone Number', field: 'phone'},
        {name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true, format: val => `${val}$`},
        {name: 'createdOn', align: 'left', label: 'CreatedOn', field: 'createdOn', sortable: true},
        {name: 'actions', align: 'left', label: 'Actions'}
      ],
      rows: []
    }
  },
  methods: {
    ...mapActions('deals', ['getDeals', 'deleteDeal']),
    ...mapMutations('deals', ['setEditedDeal', "setEditedDealId"]),
    // read(){
    //   firebaseDatabase.read({entity: this.tableName})
    //       .then(res =>{
    //         this.rows = res
    //       })
    // },
    remove(id) {
      this.setEditedDealId(id)
      this.deleteDeal()
      // firebaseDatabase.remove({entity: this.tableName,id:id})
      //     .then(res =>{
      //       console.log('res::::::::::::: ', res)
      //       this.read()
      //     })
    },
    goToDealInfo(id){
      this.$router.push(`/deal-information/${id}`)
    }
  },
  created() {
    //this.read()
    this.getDeals()
  },
  watch:{
    isReload(){
     // this.read()
      console.log('hi')
    }
  }
}
</script>

<style scoped>

</style>
