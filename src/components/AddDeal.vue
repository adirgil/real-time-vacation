<template>
  <div class="q-pa-md">
    <br><br><br>
    <div class="row items-start all-inputs">
      <q-input type="text" outlined v-model="localEditedDeal.sellerName" label="Seller Name"/>
      <!--      <q-input type="text" outlined v-model="editedDeal.destination" label="Destination"/>-->
      <q-select
          filled
          v-model="localEditedDeal.destination"
          use-input
          input-debounce="0"
          label="Destination"
          :options="countryOptions"
          @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
          label="Airline"
          transition-show="scale"
          transition-hide="scale"
          filled
          v-model="localEditedDeal.airline"
          :options="airlineOptions"
      />
      <q-input v-model="localEditedDeal.date" filled type="date" label="Departing"/>
      <q-input v-model="localEditedDeal.returnDate" filled type="date" label="Returning"/>
      <q-input type="number" outlined v-model="localEditedDeal.stayTime" label="Stay Time (days)"/>
      <q-input type="text" outlined v-model="localEditedDeal.hotel" label="Hotel"/>
      <q-input type="text" outlined v-model="localEditedDeal.phone" label="Phone Number"/>
      <q-input type="number" outlined v-model="localEditedDeal.purchaseCost" label="Purchase Cost"/>
      <q-input type="number" outlined v-model="localEditedDeal.price" label="Price"/>
      <!--      <div>-->
      <!--        <q-file outlined v-model="uploadFile1" no-caps>upload a image</q-file>-->
      <!--        <q-btn @click="uploadToStorage()">upload</q-btn>-->
      <!--      </div>-->

      <!--          append for q-file if you want to append-->

      <q-file
          v-model="imagesLocal"
          label="Pick files"
          outlined
          multiple
          style="max-width: 300px">
        <q-icon name="attachment" color="orange"/>
      </q-file>
      <q-btn v-if="!deal && !spinner" class="glossy" color="accent" label="Add" @click="addDeal()"/>
      <q-btn v-if="deal && !spinner" class="glossy" color="accent" label="Update" @click="updateDealLocal()"/>
      <q-spinner-pie color="orange" v-if="spinner" size="5em" style="margin-left: 120px"/>
    </div>
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage/storageIndex'
import apiIndex from "../middleware/api/apiIndex";
import firebaseIndex from '../middleware/firebase/firebase-index'

import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapState, mapActions, mapMutations} from 'vuex'
import {date} from "quasar";

const stringOptions = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla",
  "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana",
  "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia",
  "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands",
  "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada",
  "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras",
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
  "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal",
  "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion",
  "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis",
  "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este",
  "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela",
  "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
export default {
  name: "AddDeal",
  props: ['tableName', 'deal'],
  computed: mapState('deals', ['editedDeal']),
  data() {
    return {
      text: '',
      spinner: false,
      uploadFile1: null,
      uploadFile2: null,
      model: null,
      imagesLocal: null,
      countryOptions: stringOptions,
      airlineOptions: ['with no flight', 'ELAL', 'ISRAIR'],
      localEditedDeal: {
        sellerName: '',
        destination: '',
        airline: '',
        date: 'depart date',
        returnDate: 'return date',
        stayTime: 0,
        hotel: '',
        phone: '',
        price: 0,
        purchaseCost: 0
      }
    }
  },
  methods: {
    ...mapActions('deals', ['insertDeal', 'updateDeal', 'setEditedDealById']),
    ...mapMutations('deals', ['setEditedDeal', "setEditedDealId"]),
    uploadToStorage() {
      firebaseDatabase.uploadFiles({entity: 'deals-images', files: this.images})
          .then(result => {
            console.log('URL: ', result)
          })

    },
    addDeal() {
      this.spinner = true
      if (this.imagesLocal) {
        firebaseDatabase.uploadFiles({entity: 'deals-images', files: this.imagesLocal})
            .then(result => {
              console.log('url array: ', result)
              this.localEditedDeal.images = result
              this.localEditedDeal.userId = window.user.uid
              //this.localEditedDeal.createdTime = 'ggg'
              this.setEditedDeal(this.localEditedDeal)
              this.insertDeal()
              this.$router.push('/home')
            })
      } else {
        console.log('no images')
        this.localEditedDeal.userId = window.user.uid
        //this.localEditedDeal.createdTime = new Date()

        this.setEditedDeal(this.localEditedDeal)
        this.insertDeal()
        this.$router.push('/home')
      }

      /////NEED TO FIX UPLOAD

    },
    updateDealLocal() {
      this.spinner = true
      console.log(this.imagesLocal)
      if (this.imagesLocal) {
        firebaseDatabase.uploadFiles({entity: 'deals-images', files: this.imagesLocal})
            .then(result => {
              console.log('url array: ', result)
              this.localEditedDeal.images = result
              this.localEditedDeal.userId = window.user.uid
              this.setEditedDeal(this.localEditedDeal)
              this.updateDeal()
              this.$router.push('/home')
            })
      } else {
        console.log('no images')
        this.localEditedDeal.userId = window.user.uid
        this.setEditedDeal(this.localEditedDeal)
        this.updateDeal()
        this.$router.push('/home')
      }

    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.countryOptions = stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  created() {
    if (this.$route.params.id) {
      this.setEditedDealId(this.$route.params.id)
      this.setEditedDealById()
          .then(() => {
            Object.assign(this.localEditedDeal, this.editedDeal)
          })
    }

    // if (this.deal) {
    //   this.localEditedDeal = this.deal
    // }
  }
}
</script>

<style lang="sass" scoped>
.all-inputs
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  column-gap: 15px
  row-gap: 15px
</style>