<template>
  <div class="v-signup">
    <div class="v-signup__wrapper">
      <div class="v-signup__form">
        <div class="v-signup__form-header">
          <span>Регистрация</span>
        </div>
        <div class="v-signup__form-err" v-if="error">
          <span>{{error}}</span>
        </div>
        <div class="v-signup__form-input">
          <label for="name">Имя</label>
          <input type="text" name="name" label="Имя" id="name" required v-model="name">
        </div>
        <div class="v-signup__form-input">
          <label for="login">Login</label>
          <input type="email" name="login" label="E-mail" id="login" required v-model="email">
        </div>
        <div class="v-signup__form-input">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" required v-model="password">
        </div>
        <div class="v-signup__form-btn">
          <button class="btn btn-primary" :disabled="processing" @click.prevent="signup">Зарегистрироваться</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "Signup",
  data() {
  return {
    email: null,
    password: null,
    name: null
  }
  },
  methods: {
  signup() {
    let vm = this
    vm.$store.dispatch('SIGNUP', {email: this.email, password: this.password, name: this.name})
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
  }
}
</script>

<style scoped lang="scss">
  .v-signup {
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