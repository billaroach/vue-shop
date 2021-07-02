<template>
  <div class="v-main-wrapper">
    <div class="v-main-wrapper__toolbar toolbar">
      <div class="toolbar__item" v-if="!isUserAuthenticated">
        <router-link to="signup" >
          <button class="btn-toolbar">Регистрация</button>
        </router-link>
      </div>
      <div class="toolbar__item" v-if="!isUserAuthenticated">
        <router-link to="signin" >
          <button class="btn-toolbar">Войти</button>
        </router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link @click.prevent="signout" to="about" >
          <button class="btn-toolbar">Выйти</button>
        </router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link to="admin" >
          <button class="btn-toolbar">Панель БД</button>
        </router-link>
      </div>
      <div class="toolbar__item" v-if="isUserAuthenticated">
        <router-link to="profile" >
          <button class="btn-toolbar">Профиль</button>
        </router-link>
      </div>
      <div class="toolbar__item">
        <router-link to="/">
          <button class="btn-toolbar">Главная</button>
        </router-link>
      </div>
      <div class="toolbar__item">
        <router-link to="about">
          <button class="btn-toolbar">О сайте</button>
        </router-link>
      </div>
      <div class="toolbar__item">
        <a href="https://github.com/billaroach">
          <button class="btn-toolbar">GitHub</button>
        </a>
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

     }
  }
 .btn-toolbar {
   border-radius: 15px;
   border: none;
   padding: 5px 15px;

   &:hover {
     color: violet;
   }
 }
  a {
    text-decoration: none;
    list-style: none;
  }

</style>