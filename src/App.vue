<template>
  <q-layout view="lHh Lpr lFf" class="bg-sky">

    <q-page-container>
      <q-toolbar class="my-toolbar" v-if="this.$route.fullPath !== '/'">

        <q-btn flat no-caps @click="goToHome()" class="rtv">
          <img class="map-pin-icon" src="./assets/globe.svg">
          <span class="desktop-header">Real Time Vacation</span>
          <span class="mobile-header">RTVacation</span>
        </q-btn>
        <q-space/>

        <q-tabs v-model="tab" shrink class="on-mobile">
          <q-tab name="logout" no-caps label="Logout" @click="logout()"/>
          <q-btn-dropdown
              split
              label="More"
              no-caps
              style="background-color: #02122c; color: #FF7B59"
          >
            <q-list>
              <q-item clickable v-close-popup @click="goToPostNewDeal()">
                <q-item-section avatar>
                  <q-avatar icon="post_add" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-family: system-ui">Post New Deal</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToMyDeals()">
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-family: system-ui">My Deals</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToWishlist()">
                <q-item-section avatar>
                  <q-avatar icon="favorite" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-family: system-ui">Wishlist</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToBackOffice()">
                <q-item-section avatar>
                  <q-avatar icon="keyboard_backspace" color="primary" text-color="white"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="font-family: system-ui">Backoffice</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
      </q-toolbar>
      <q-separator />

      <q-footer style="background-color: #02122c; color: #FF7B59" reveal elevated>
        <q-toolbar>
          <q-toolbar-title>Contact 0526999340 - Adir</q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BackOffice from "@/views/BackOffice";
import firebaseInstance from './middleware/firebase/firebase-index'
import {mapActions, mapState} from "vuex";

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld, BackOffice
  },
  computed: mapState('deals', ['username', 'userEmail']),

  data() {
    return {
      leftDrawerOpen: false,
      tab: '',
      fab2: false
    }
  },
  methods: {
    ...mapActions('deals', ['setUser']),
    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        console.log(JSON.stringify(window.user) + 'Logged out!!')
        this.setUser('out')
        this.$router.push('/')
      }).catch((error) => {
        console.log(error)
      });

    },
    goToBackOffice() {
      this.$router.push('/back-office')
    },
    goToWishlist() {
      this.$router.push('/wishlist')
    },
    goToHome() {
      this.tab = ''
      this.$router.push('/home')
    },
    goToMyDeals() {
      this.tab = ''
      this.$router.push('/my-deals')
    },
    goToPostNewDeal() {
      this.tab = ''
      this.$router.push('/post-new-deal')
    }
  },
  created() {
    console.log(this.$route.fullPath === "/")
  }
}
</script>

<style lang="sass" scoped>
.bg-sky
  font-family: system-ui
//background-image: url('assets/3.jpg')
.map-pin-icon
  height: 30px
  width: 30px
  margin-right: 5px

.bg-darkblue
  background-color: #02122c

.my-toolbar
  min-height: 120px
.mobile-header
  display: none
.desktop-header
  display: block
.rtv
  font-size: 25px

@media only screen and (max-width: 700px)
  .on-mobile
    display: grid
  .mobile-header
    display: block
  .desktop-header
    display: none
  .rtv
    font-size: 15px



</style>
