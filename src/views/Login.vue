<template>
  <div>
    <h2>Login</h2>
    <q-input outlined v-model="email" label="Email" />
    <q-input outlined v-model="password" label="Password" />
    <q-btn @click="login()">Login</q-btn>
    <q-btn @click="loginWithGoogle()">Login With Google</q-btn>

    <h2>Sign-Up</h2>
    <q-input outlined v-model="signup_email" label="Email" />
    <q-input outlined v-model="signup_password" label="Password" />
    <q-btn @click="signUp()">Sign Up!</q-btn>
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

<style scoped>

</style>