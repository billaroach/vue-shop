<template>
  <div class="v-main-wrapper">
    <div class="v-main-wrapper__toolbar toolbar">
      <div class="toolbar__item" v-if="!isUserAuthenticated">
        <router-link to="signup" >Регистрация</router-link>
      </div>
      <div class="toolbar__item" v-if="!isUserAuthenticated">
        <router-link to="signin" >Войти</router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link @click.prevent="signout" to="about" >Выйти</router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link to="admin" >Панель БД</router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link to="profile" >Профиль</router-link>
      </div>
      <div class="toolbar__item">
        <router-link to="/">Главная</router-link>
      </div>
      <div class="toolbar__item">
        <router-link to="about">О сайте</router-link>
      </div>
      <div class="toolbar__item">
        <a href="https://github.com/billaroach">GitHub</a>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import firebase from "firebase";
export default {
  name: "v-main-wrapper",
  data() {
    return {
      title: "Main wrapper"
    }
  },
  props: {

  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  methods: {
    signout() {
      let vm = this
      vm.$store.dispatch('SIGNOUT')
    }
  },
  watch: {

  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },
  mounted() {
    console.log("Loaded")
  }

}
</script>

<style lang="scss">

  .v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;


    &__toolbar {
      position: absolute;
      top: 10px;
      display: flex;
      justify-content: space-between;
      width: 900px;
      margin: 0 auto;
      padding: 10px;
      border: 1px solid gray;
      border-radius: 5px;


      &__item {

      }
     }
  }


</style>