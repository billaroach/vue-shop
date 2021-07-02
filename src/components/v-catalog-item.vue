<template>
  <div class="v-catalog-item">
    <img class="v-catalog-item__image" :src=product_data.imageURL alt="img">
    <p class="v-catalog_item__name">{{product_data.title}}</p>
    <p class="v-catalog_item__price]">Price: {{ product_data.price }} P</p>

    <router-link :to="{name: 'product', params: {id: product_data.id}}">
      <button
          class="btn btn-primary"
          @click="addToCart"
      >Подробнее
      </button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data, )
    },
  }
}
</script>

<style lang="scss">
  .v-catalog-item {

    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;

    &__image {
    width: 180px;
  }
  }

</style>