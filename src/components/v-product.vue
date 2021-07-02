<template>
  <div class="v-product">

    <div class="v-profile__order-item">
      <div class="v-profile__img-container">
        <img class="v-order-item__image" :src=product.imageURL alt="img">
      </div>
      <div class="v-order-item__text-info">
        <h3>{{product.title}}</h3>
        <p class="v-profile__section-name">Стоимость единицы:</p>
        <p>{{product.price}} Р</p>
        <p class="v-profile__section-name">Описание:</p>
        <p>{{product.description}}</p>
      </div>

      <div class="v-product__add-btn">
        <button
            class="btn btn-primary"
            @click="addToItems"
        >Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from "@/main";
import {mapActions} from "vuex";


export default {
name: "v-product",
  props: {
    id: null,
  },
  data() {
  return {
    product: {
      id: null,
      title: null,
      description: null,
      price: null,
      type: null,
      imageURL: null,
    },
  }
  },
  methods: {
    ...mapActions([

      'addToCart',
      'LOAD_PRODUCTS'
    ]),
    AddToItems() {
      this.addToCart(this.product);
    },
  },
  mounted() {
    db.collection("products").doc(this.id.toString()).get().then((doc) => {
      this.product.id = doc.data().id;
      this.product.title = doc.data().title;
      this.product.type = doc.data().type;
      this.product.price = doc.data().price;
      this.product.description = doc.data().description;
      this.product.imageURL = doc.data().imageURL;
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}
</script>

<style lang="scss" scoped>
.v-profile {
  font-family: "Comic Sans MS", sans-serif;
  &__header{
    padding: 20px 0;
  }
  &__header h1{
    font-weight: bold;
  }

  &__section-name {
    font-weight: bold;
  }
  &__order-item {
    padding: 30px;
    display: flex;
    margin-bottom: 30px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  &__img-container {

  }


}

.v-order-item__image {
  width: 350px;
}

</style>