<template>
  <div class="v-checkout">
    <div class="checkout-box">
      <h1>Congratulations!</h1>
      <h2>Your goods are on their way to you!</h2>
      <span class="checkout-box__ord-number">Номер заказа</span>
      <div class="checkout-box__goods">
        <v-profile></v-profile>
      </div>
      <div class="checkout-box__shipping">
        Здесь будет имя и адрес покупателя
      </div>
      <button class="btn btn-primary">Получить корзину</button>
      <router-link :to="{name: 'catalog'}">
        <button class="btn btn-to-catalog" @click="setOrder" type="submit">
          Back to catalog
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-checkout",
  computed: {
    ...mapGetters([
      'cart',
      'userData',
      'getProcessing'
    ])
  },
  mounted() {
    this.$store.dispatch('ADD_USER_ORDER', this.cart);
  },
  methods: {
    checkCart() {
      console.log(this.cart);
    },
    getUserDataOrder(){
      return this.userData.orders;
    },
    setOrder() {
      this.$store.dispatch('ADD_USER_ORDER', this.cart);
    }
  }
}
</script>

<style scoped>
  .checkout-box {
    padding: 30px 0px 30px 40px;
    box-shadow: 0px 5px 15px rgba(62, 75, 102, 0.15);
    border: 1px solid #f3f3f3;
    border-radius: 15px;
  }
</style>