<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog__checkout">
        Back to catalog
      </div>
    </router-link>
    <h1 class="head">Корзина</h1>
    <p v-if="!Object.keys(cart).length">There are no products yet.</p>
    <div class="v-cart-list" v-for="(item) in cart" :key="item.id">
      <div class="v-cart-item">
<!--    <img class="v-cart-item__image" :src="require ('../assets/images/' + item.image)" alt="img">-->
        <img class="v-cart-item__image" :src=item.imageURL alt="img">
        <div class="v-cart-item__text-info" >
          <p>{{item.title}}</p>
          <p>{{item.price}}</p>
          <p>{{item.description}}</p>
        </div>
        <div class="v-cart-item__quantity">
          <p>Qty:</p>
          <select
              name="quantity"
              v-model="item.qt"
              @change="changeQt();">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
            <option :value="6">6</option>
            <option :value="7">7</option>
            <option :value="8">8</option>
            <option :value="9">9</option>
          </select>
          <button class="btn btn-primary"
                  @click.prevent="deleteFromCart(item.id)"
          >Delete
          </button>
        </div>
      </div>
    </div>
    <div class="v-cart__total" v-if="Object.keys(cart).length">
      <p class="total__name">Total: <br></p>
      <div class="total__value">
        <p> {{ Total }}</p>
      </div>

    </div>
    <router-link v-if="Object.keys(cart).length" :to="{name: 'payment'}">
      <div class="v-cart__payment">
        <button class="btn btn-primary" type="submit">Continue</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapGetters ,mapActions} from "vuex";

export default {
  name: "v-cart",
  components: {

  },
  props: {
    cart_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
        'cart',
        'Total'
    ]),

  },
  methods: {
    ...mapActions([
      "removeProduct",
      "changeQt",
      "revivalProduct"
    ]),
    deleteFromCart(index) {
      this.removeProduct(index)
    }
  },
}
</script>

<style lang="scss" scoped>
.head {
  margin-top: 100px;
}
  .v-cart {
    text-align: center;


    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*3;
      display: flex;
      justify-content: center;
      background: #26ae68;
      color: #ffffff;
      font-size: 20px;
    }

    &__name {
      margin-right: $margin*2;

    }
  }
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &__image {
      max-width: 50px;
    }
  }


</style>