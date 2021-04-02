<template>
  <q-layout view="lHh Lpr lFf" class="bg-sky">

    <q-page-container>
        <q-toolbar class="my-toolbar">

        <q-btn flat no-caps @click="goToHome()">
          <img class="map-pin-icon" src="./assets/globe.svg">
           Real Time Vacation
        </q-btn>
        <q-space/>

        <q-tabs v-model="tab" shrink>
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
                  <q-avatar icon="post_add" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Post New Deal</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToMyDeals()">
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>My Deals</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToWishlist()">
                <q-item-section avatar>
                  <q-avatar icon="favorite" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Wishlist</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="goToBackOffice()">
                <q-item-section avatar>
                  <q-avatar icon="keyboard_backspace" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Backoffice</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>

      </q-toolbar>
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
      fab2:false
    }
  },
  methods: {
    ...mapActions('deals', ['setUser']),
    logout(){
      firebaseInstance.firebase.auth().signOut().then(() => {
        console.log(JSON.stringify(window.user) + 'Logged out!!')
        this.setUser('out')
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
  }
}
</script>

<style lang="sass" scoped>
.bg-sky
  //background-image: url('assets/3.jpg')
.map-pin-icon
  height: 30px
  width: 30px
  margin-right: 5px
.bg-darkblue
  background-color: #02122c

.my-toolbar
  min-height: 120px

</style>
