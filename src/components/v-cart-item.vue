<template>
  <div class="v-cart-item" >
    <div class="v-cart-item__info">

      <div class="v-cart-item__text-info" >
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <p>{{item.article}}</p>

      </div>
      <button class="btn btn-primary"
              @click.prevent="deleteFromCart"
      >Delete
      </button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
  name: "v-cart-item",
  /*props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },*/

  mounted() {
    //this.$store.dispatch('ADD_TO_CART', {...this.product, quantity: this.quantity})
  },
  computed: {
    ...mapGetters(["cart", "TotalPositions", "delProduct", "Total"])
  },

  methods: {
    ...mapActions(["removeProduct", "changeQt"]),

    /*deleteFromCart()
    {
      this.$emit('deleteFromCart')
    }*/
  },

}
</script>

<style lang="scss">

</style>