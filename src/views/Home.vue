<template>
  <div class="home">
    <div class="">
      <div class="filter-div">
        <div class="inside-filter-div glossy">
          <div class="top-filter">
            <div class="country-area">
              <div class="q-gutter-sm text-white">
                <q-radio v-model="radioSelect" val="all" label="All"/>
                <q-radio v-model="radioSelect" val="israel" label="Israel"/>
              </div>
            </div>
          </div>

          <div style="display:flex;" >
            <q-select outlined
                      @filter="filterFn"
                      v-if="radioSelect!=='israel'"
                      v-model="selectedCountry" :options="countryOptions"
                      label="Destination"
                      bg-color="white"
                      class="single-input"
            />
            <q-input outlined v-model="fromSearch" label="Depart" bg-color="white" style="width: 150px" class="single-input">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fromSearch">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input outlined v-model="toSearch" label="Return" bg-color="white" style="width: 150px" class="single-input">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="toSearch">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input type="number" v-model="maxPrice" outlined label="max Price($)" class="single-input" bg-color="white"/>
          </div>

<!--          <div class="cancel-span">-->
<!--            <q-btn class="glossy" size="10px" round color="red-14" icon="delete_forever" @click="cancelSearch()">-->
<!--              <q-tooltip-->
<!--                  transition-show="scale"-->
<!--                  transition-hide="scale"-->
<!--                  anchor="top middle"-->
<!--                  self="bottom middle"-->
<!--              >-->
<!--                clean search!-->
<!--              </q-tooltip>-->
<!--            </q-btn>-->
<!--            <span class="glossy text-white">{{ searchLabel }}</span>-->
<!--          </div>-->
          <div class="q-pa-md search-div">
            <q-btn @click="search()" no-caps color="primary" icon-right="send" label="Search"/>
          </div>
        </div>
      </div>
      <div class="flex">
        <div v-if="displayCards" v-for="deal in allDealsFiltered" :key="deal.id"
             class="q-pa-md row items-start q-gutter-md">
          <DealCard :deal="deal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import DealCard from "@/components/DealCard";
import DealInformation from "@/views/DealInformation";
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapState, mapActions, mapMutations} from 'vuex'
import { date } from 'quasar'


const stringOptions = ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla",
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
  "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]

export default {
  name: 'Home',
  computed: mapState('deals', ['editedDeal', 'deals']),
  data() {
    return {
      tab: '',
      searchLabel: '',
      fromSearch: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      toSearch: date.formatDate(Date.now(), 'YYYY/MM/DD'),
      maxPrice: 0,
      radioSelect: 'all',
      countryOptions: stringOptions,
      selectedCountry: '',
      tableName: 'deals',
      //allDeals: [],
      allDealsFiltered: [],
      wishlistArray: [],
      displayCards: false,
      standard: {
        min: 0,
        max: 10000
      }

    }
  },
  components: {
    DealInformation,
    HelloWorld, DealCard
  },
  methods: {
    ...mapActions('deals', ['getDeals']),
    ...mapMutations('deals', ['setEditedDeal', 'setEditedDealId']),
    search() {
      let res
      if (this.radioSelect == 'israel') {
        this.searchLabel = 'Israel, '
        res = this.deals.filter(deal => {
          return deal.destination == 'Israel'
        })
      } else {   //this.radioSelect == all
        if (this.selectedCountry == '') {
          res = this.deals
          this.searchLabel = 'All, '
        } else {
          res = this.deals.filter(deal => {
            return deal.destination == this.selectedCountry
          })
          this.searchLabel = `${this.selectedCountry}, `
        }
      }
      this.searchLabel += ` max:${this.maxPrice}$, `
      const result = res.filter(deal => {
        return parseInt(deal.price) <= this.maxPrice
      })
      const fromDate = date.extractDate(this.fromSearch , 'YYYY/MM/DD')
      const toDate = date.extractDate(this.toSearch, 'YYYY/MM/DD')
      const finalResult = result.filter(deal => {
        return fromDate >= date.extractDate(deal.date , 'YYYY-MM-DD')  &&
            toDate <= date.extractDate(deal.returnDate , 'YYYY-MM-DD')
      })
      this.searchLabel += ` between ${this.fromSearch} to ${this.toSearch}`
      this.allDealsFiltered = finalResult
    },
    cancelSearch() {
      this.allDealsFiltered = this.deals
      this.searchLabel = ''
    },
    filterOnlyInIsrael() {
      this.allDealsFiltered = this.deals.filter(deal => {
        return deal.destination == 'Israel'
      })
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
    },
  },
  created() {
    console.log(window.user)
    this.getDeals().then(() => {
      this.displayCards = true
      this.allDealsFiltered = this.deals
    })
  }

}
</script>

<style lang="sass" scoped>
.search-div
  display: flex
  justify-content: flex-end
  padding: 10px 0px 0px 0px

.filter-div
  width: 100%
  height: 400px
  //background-image: url('../assets/ethan-robertson-SYx3UCHZJlo-unsplash.jpg')
  background-image: url("../assets/pexels-tomáš-malík-1998439.jpg")
  background-size: 100% 400px
  display: flex
  justify-content: center
  align-items: center

.inside-filter-div
  background-color: #02122c
  width: 80%
  max-height: 210px
  border-radius: 10px
  display: flex
  flex-direction: column
  justify-content: space-between
  padding: 10px 10px
  opacity: 0.9

.top-filter
  display: flex
  justify-content: space-between

.cancel-span
  margin-top: 10px

.select-country
  height: 40px
  width: 200px
  margin-top: 20px

.single-input
  margin-right: 5px
  width: 9.4rem
</style>
