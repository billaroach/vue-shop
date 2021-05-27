<template>
  <div class="v-signin">
    <div class="v-signin__wrapper">
      <div class="v-signin__form">
        <div class="v-signin__form-header">
          <span>Вход</span>
        </div>
        <div class="v-signin__form-err" v-if="error">
          <span>{{error}}</span>
        </div>
        <div class="v-signin__form-input">
          <label for="login">Login</label>
          <input type="email" name="login" label="E-mail" id="login" required v-model="email">
        </div>
        <div class="v-signin__form-input">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" required v-model="password">
        </div>
        <div class="v-signin__form-btn">
          <button class="btn btn-primary" :disabled="processing" @click.prevent="signin">Войти</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    signin() {
      let vm = this
      vm.$store.dispatch('SIGNIN', {email: this.email, password: this.password})
    }
  },
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    },
    error() {
      return this.$store.getters.getError;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  watch: {
    isUserAuthenticated(value) {
      if(value === true) {
        this.$router.push({ name: 'catalog' });
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
.v-signin {
  &__wrapper {
    position: relative;
    padding-top: 100px;
  }
  &__form {
    margin: 0 auto;
    width: 600px;
    min-height: 250px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  &__form-header {
    padding: 20px 30px;
  }
}
</style>