<template>
 <div class="v-admin">
   <h1 class="v-admin__head">Админ панель</h1>
   <div class="v-admin__controls">
     <button class="btn btn-primary" @click='toggle1 = !toggle1'>Добавить товар</button>
     <button class="btn btn-primary" @click="toggle2 = !toggle2">Изменить товар</button>
     <button class="btn btn-primary" @click="toggle3 = !toggle3">Удалить товар</button>
   </div>
   <div class="v-admin__add" v-show='toggle1'>
     <h2>Добавить товар</h2>
     <div class="v-admin__form">
       <label for="id">ID Товара</label>
       <input type="number" id="id" v-model="id">
       <label for="title">Название</label>
       <input type="text" id="title" v-model="title">
       <label for="description">Описание</label>
       <input type="text" id="description" v-model="description">
       <label for="price">Цена</label>
       <input type="number" id="price" v-model="price">
       <label for="type">Тип товара</label>
       <input type="text" id="type" v-model="type">
       <label for="imageURL">URL изображения</label>
       <input type="text" id="imageURL" v-model="imageURL">
       <button type="button" class="btn btn-primary" @click.prevent="addProduct">Создать продукт</button>
     </div>
   </div>
   <div class="v-admin__change" v-show='toggle2'>
     <h2>Изменить товар</h2>
     <div class="v-admin__form">
       <select v-model="selectedId" @change="getProduct">
         <option v-for="id in id_list" :key="id" v-bind:value="id">
           {{ id }}
         </option>
       </select>
       <span>Выбранный товар: {{selectedId}}</span>
       <div class="v-profile__order-item" v-if="selectedId">
         <img class="v-order-item__image" :src=product.imageURL alt="img">
         <div class="v-order-item__text-info">
           <p class="v-profile__section-name">Название:</p>
           <p >{{product.title}}</p>
           <p class="v-profile__section-name">Стоимость единицы:</p>
           <p>{{product.price}} Р</p>
           <p class="v-profile__section-name">Описание:</p>
           <p>{{product.description}}</p>
         </div>
       </div>
       <div class="v-admin__form">
         <label for="id_c">ID Товара</label>
         <input type="number" id="id_c"  v-model="id">
         <label for="title_c">Название</label>
         <input type="text" id="title_c"  v-model="title">
         <label for="description_c">Описание</label>
         <input type="text" id="description_c"  v-model="description">
         <label for="price_c">Цена</label>
         <input type="number" id="price_c" v-model="price">
         <label for="type_c">Тип товара</label>
         <input type="text" id="type_c" v-model="type">
         <label for="imageURL_c">URL изображения</label>
         <input type="text" id="imageURL_c"  v-model="imageURL">
       </div>
       <button type="button" class="btn btn-primary" @click.prevent="updateProduct">Изменить выбранный товар</button>
     </div>
   </div>
   <div class="v-admin__delete" v-show='toggle3'>
     <h2>Удалить товар</h2>
     <div class="v-admin__form">
        <select v-model="selectedId" @change="getProduct">
          <option v-for="id in id_list" :key="id" v-bind:value="id">
            {{ id }}
          </option>
        </select>
       <span>Выбранный товар: {{selectedId}}</span>
       <div class="v-profile__order-item" v-if="selectedId">
         <img class="v-order-item__image" :src=product.imageURL alt="img">
         <div class="v-order-item__text-info">
           <p class="v-profile__section-name">Название:</p>
           <p >{{product.title}}</p>
           <p class="v-profile__section-name">Стоимость единицы:</p>
           <p>{{product.price}} Р</p>
           <p class="v-profile__section-name">Описание:</p>
           <p>{{product.description}}</p>
         </div>
       </div>
       <button type="button" class="btn btn-primary" @click.prevent="deleteProduct">Удалить выбранный товар</button>
     </div>
   </div>
 </div>
</template>

<script>
import {db} from "@/main";
import {mapGetters} from "vuex";
export default {
name: "v-admin",
  data() {
  return {
    toggle1: false,
    toggle2: false,
    toggle3: false,
    id: null,
    title: null,
    description: null,
    price: null,
    type: null,
    imageURL: null,

    id_list: [],
    selectedId: null,
    product: {
      id: null,
      title: null,
      description: null,
      price: null,
      type: null,
      imageURL: null,
    }
  }
  },
  computed: {
    ...mapGetters([
      'cart',
      'Total',
      'TotalPositions',
      'userId'
    ])
  },
  methods: {
    addProduct() {
      let vm = this
      vm.$store.dispatch('ADD_PRODUCT', {
        id: parseInt(this.id), title: this.title,
        description: this.description, price: parseInt(this.price), type: this.type, imageURL: this.imageURL
      })
    },
    deleteProduct() {
      db.collection("products").doc(this.selectedId.toString()).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    },
    getProduct() {
      db.collection("products").doc(this.selectedId.toString()).get().then((doc) => {
        this.product.id = doc.data().id;
        this.product.title = doc.data().title;
        this.product.type = doc.data().type;
        this.product.price = doc.data().price;
        this.product.description = doc.data().description;
        this.product.imageURL = doc.data().imageURL;
      }).catch((error) => {
        console.error("Error getting document: ", error);
      });
    },
    updateProduct() {
    let col_ref = db.collection("products").doc(this.selectedId.toString());
      col_ref.update({
        id: this.id,
        title: this.title,
        description: this.description,
        price: this.price,
        type: this.type,
        imageURL: this.imageURL
      }).then(() => {
        console.log("Data successfully updated!");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    },
  },
  mounted() {
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.id_list.push(doc.id);
      });
    });
    console.log(this.id_list);
    // заполнение списка типов продуктов


  }
}
</script>

<style lang="scss" scoped>
.v-admin__form {
  display: flex;
  flex-direction: column;
}
.v-admin__controls {
  display: flex;
  justify-content: space-between;
}
</style>