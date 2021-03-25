<template>
  <q-layout view="lHh Lpr lFf" class="bg-sky">
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-2"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>options</q-item-label>
          <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>
            <q-item-section @click="logout()">
              <q-item-label>Log Out</q-item-label>
              <q-item-label caption>dont!</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="goToPostNewDeal()">
            <q-item-section avatar>
              <q-icon name="add"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Post New Deal</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 130px">
        <div class="absolute-bottom bg-darkblue glossy">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">userrrr</div>
          <div>adirgil7777@gmail.com</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <q-toolbar class="bg-darkblue text-white shadow-2 rounded-borders glossy ">
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="menu"
        />

        <q-btn flat no-caps @click="goToHome()">
          <img class="map-pin-icon" src="./assets/globe.svg">
           Real Time Vacation!
        </q-btn>
        <q-space/>

        <!--
          notice shrink property since we are placing it
          as child of QToolbar
        -->
        <q-tabs v-model="tab" shrink>
          <q-tab name="back-office" no-caps label="Back Office" @click="goToBackOffice()"/>
          <q-tab name="wish-list" no-caps label="Wishlist" @click="goToWishlist()"/>
          <q-tab name="my-deals" no-caps label="My Deals" @click="goToMyDeals()"/>
        </q-tabs>

      </q-toolbar>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BackOffice from "@/views/BackOffice";
import firebaseInstance from './middleware/firebase/firebase-index'

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld, BackOffice
  },

  data() {
    return {
      leftDrawerOpen: false,
      tab: '',
      fab2:false
    }
  },
  methods: {
    logout(){
      firebaseInstance.firebase.auth().signOut().then(() => {
        console.log(window.user + 'Loggeg out!!')
      }).catch((error) => {
        // An error happened.
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

</style>
