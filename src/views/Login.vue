<template>
  <div class="login-page">
    <div class="inline-box">
      <img class="map-pin-icon" src="../assets/globe.svg">
      <div style="font-size: 30px">Real Time Vacation</div>
      <div class="login-box">
        <span style="font-size: 15px">Log In with </span>
        <div>
          <q-btn @click="loginWithGoogle()" no-caps>
            <img class="login-icons" src="../assets/google.svg">
            Google
          </q-btn>
          <q-btn @click="loginWithFacebook()" no-caps style="margin-left: 10px">
            <img class="login-icons" src="../assets/facebook2.svg">
            Facebook
          </q-btn>
        </div>
        <span>or</span>
        <q-input outlined v-model="email" label="Email"/>
        <q-input outlined v-model="password" label="Password"/>
        <q-btn no-caps @click="login()">Log In</q-btn>
        <span>do not have an account? <span class="signup-btn"> Sign Up</span></span>
      </div>

    </div>
<!--    <h2>Login</h2>-->
<!--    <q-input outlined v-model="email" label="Email" />-->
<!--    <q-input outlined v-model="password" label="Password" />-->
<!--    <q-btn @click="login()">Login</q-btn>-->
<!--    <q-btn @click="loginWithGoogle()">Login With Google</q-btn>-->

<!--    <h2>Sign-Up</h2>-->
<!--    <q-input outlined v-model="signup_email" label="Email" />-->
<!--    <q-input outlined v-model="signup_password" label="Password" />-->
<!--    <q-btn @click="signUp()">Sign Up!</q-btn>-->
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase/firebase-index'
import firebaseDatabase from '../middleware/firebase/database/realtime-db-index'
import {mapActions} from "vuex";

export default {
  name: "Login",
  data(){
    return {
      email:'',
      password:'',
      signup_email:'',
      signup_password: ''
    }
  },
  methods: {
    ...mapActions('deals', ['setUser']),
    signUp(){
      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.signup_email, this.signup_password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('user added')
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });

    },
    login(){
      console.log(this.email, this.password)
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('SUCCESS with normal login')
            window.user = user.uid
            this.setUser()
            console.log('opp: ',user)
            firebaseInstance.firebase.database().ref(`users/${user.uid}`)
                .set({email: user.email})

            this.$router.push('/home')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
    },
    loginWithGoogle() {
      const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('user!!!: ', user)
            window.user = result.user
            this.setUser()
            firebaseInstance.firebase.database().ref(`users/${user.uid}`)
                .update({email: user.email})

            this.$router.push('/home')
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  },
  created() {
    if(window.user){
      //this.$router.push('/home')
    }
  }
}
</script>

<style lang="sass" scoped>
.login-page
  background-color: #02122c
  color: white
  display: flex
  justify-content: center
.inline-box
  padding: 50px
  margin: 50px
  background-color: cadetblue
  border-radius: 20px
  display: grid
  justify-items: center
.login-box
  display: grid
  justify-items: center
  row-gap: 10px
.login-icons
  height: 30px
  width: 30px
  margin-right: 5px
.map-pin-icon
  height: 50px
  width: 50px
  margin-right: 5px
.signup-btn
  background: none!important
  border: none
  padding: 0!important
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069
  text-decoration: underline
  cursor: pointer
</style>