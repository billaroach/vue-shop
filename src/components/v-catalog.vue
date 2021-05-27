<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart'}">
      <div class="v-catalog__checkout">
        Cart: {{ Object.keys(this.cart).length }}
      </div>
    </router-link>

    <h1 class="head">Каталог товаров</h1>
    <div class="v-catalog__sidebar">
      <p>Категории товаров:</p>
      <select v-model="selectedType">
        <option v-for="type in type_list" :key="type" v-bind:value="type">
          {{type}}
        </option>
      </select>
      <p>Диапазон цены:</p>
      <div class="v-catalog__range-radiolist">
        <label for="range-1" >До 1000 Р:</label>
        <input type="radio" id="range-1" value=1000 v-model.number="max_price">
        <label for="range-2">До 5000 Р:</label>
        <input type="radio" id="range-2" value=5000 v-model.number="max_price">
        <label for="range-3">До 12000 Р:</label>
        <input type="radio" id="range-3" value=12000 v-model.number="max_price">
        <label for="range-4">Без ограничений</label>
        <input type="radio" id="range-4" value=50000 v-model.number="max_price">
      </div>

    </div>

    <div class="v-catalog__list">
      <v-catalog-item
      v-for="product in filteredProducts"
      :key="product.id"
      :product_data="product"
      @addToCart="AddToItems"/>
    </div>

  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'
import {db} from "@/main";

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,

  },
  props: {},
  data() {
    return {
      type_arr: [],
      unique_arr: [],
      type_list: [],
      price_list:[],
      selectedType: null,
      sortedProducts: [],
      min_price: 0,
      max_price: 0

    }
  },
  computed: {
    ...mapGetters([
        'Products',
        'cart'
    ]),
    filteredProducts() {
      if(this.selectedType === null) {
        return this.Products
      }
      else {
        return this.Products.filter(p => p.type === this.selectedType && p.price < parseInt(this.max_price));
      }
    }

  },
  methods: {
    ...mapActions([

        'addToCart',
        'LOAD_PRODUCTS'
    ]),
    AddToItems(data) {
      this.addToCart(data);
    },
    getMinMax(arr) {
      let min = arr[0];
      let max = arr[0];
      let i = arr.length;

      while (i--) {
        min = arr[i] < min ? arr[i] : min;
        max = arr[i] > max ? arr[i] : max;
     }
      return { min, max };
    }
  },

  mounted() {
    /*this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if(response.data) {
        console.log("Data arrived!")
      }
    })*/
    this.LOAD_PRODUCTS()
    .then((response) => {
      if(response) {
        console.log("Data arrived!")
      }
    })

  },
  created() {
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.type_arr.push(doc.data().type);
        this.price_list.push(parseInt(doc.data().price));
      });
      this.type_list = [...new Set(this.type_arr)];
      /*this.min_price = this.getMinMax(this.price_list).min;
      this.max_price = this.getMinMax(this.price_list).max;
      console.log(this.min_price);
      console.log(this.max_price);*/
    });
  },
}
</script>

<style lang="scss">
.head {
  margin-top: 100px;
}
  .v-catalog {
    text-align: center;
    position: relative;
    &__list {
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      align-items: center;
      padding-top: 50px;
    }
    &__checkout {
      position: fixed;
      top: 10px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px #aeaeae;
    }
    &__sidebar {
      position: fixed;
      top: 100px;
      left: 10px;
      padding: $padding*2;
      border: solid 1px #aeaeae;
    }

    &__range-radiolist {
      display: flex;
      flex-direction: column;
      align-items: center;
    }


  }
</style>