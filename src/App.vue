<template>
  <div class="hello">
    <v-main-wrapper />
  </div>
</template>

<script>
import vMainWrapper from './components/v-main-wrapper'
import firebase from "firebase";
export default {
  name: 'App',
  components: {
  vMainWrapper

  },
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged((user) => {
        vm.$store.dispatch('STATE_CHANGED', user)
    });
    this.$store.dispatch('LOAD_PRODUCTS');
  }
}
</script>

<style>
a {
  text-decoration: none;
  list-style: none;
}
html {
  background-color:#F9F9F9;
}
.hello {
  background-color:#F9F9F9;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
