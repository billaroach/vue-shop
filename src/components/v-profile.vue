<template>
  <div class="v-profile">
    <div class="v-profile__header">
      <h1>Ваш последний заказ:</h1>
    </div>
    <div class="v-profile-order-wrapper">
      <div class="v-profile__last-order" >
        <div class="v-profile__item-list" v-for="item in last_order" :key="item.id">
          <div class="v-profile__order-item">
            <img class="v-order-item__image" :src=item.imageURL alt="img">
            <div class="v-order-item__text-info">
              <p class="v-profile__section-name">Название:</p>
              <p >{{item.title}}</p>
              <p class="v-profile__section-name">Стоимость единицы:</p>
              <p>{{item.price}} Р</p>
              <p class="v-profile__section-name">Описание:</p>
              <p>{{item.description}}</p>
              <p class="v-profile__section-name">Количество:</p>
              <p>{{item.qt}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="v-order-item__amount">
        <span class="v-profile__section-name">Общая стоимость заказа:</span>
        <p>{{last_order_amount}}Р</p>
        <span class="v-profile__section-name">Дата и время заказа:</span>
        <p>{{last_order_date}}</p>
        <span class="v-profile__section-name">Имя покупателя:</span>
        <p>{{userName}}</p>
      </div>
    </div>


  </div>
</template>

<script>
import {db} from "@/main";
import {mapGetters} from "vuex";


export default {
  name: "v-profile",
  data() {
    return {
      last_order: null,
      last_order_amount: null,
      last_order_date: null

    }
  },
  methods: {
    addProduct() {
      let vm = this
      vm.$store.dispatch('ADD_PRODUCT', {
        id: this.id, title: this.title,
        description: this.description, price: this.price, type: this.type, imageURL: this.imageURL
      })
    }
    },
    computed: {
      ...mapGetters([
        'cart',
        'Total',
        'TotalPositions',
        'userId',
        'userName',
        'lastOrderDate'
      ])
    },
    mounted() {
      let docRef = db.collection("userData").doc(this.userId);
      docRef.get().then((doc) => {
        if (doc.exists) {

          console.log("Document data:", doc.data().orders.order.items);
          this.last_order = doc.data().orders.order.items;
          this.last_order_amount = doc.data().orders.order.amount;
          this.last_order_date = doc.data().orders.order.addedDate.toDate() ;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
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


}

.v-order-item__text-info {
  padding-left: 40px;
}

.v-profile-order-wrapper {
  display: flex;

}

.v-order-item__amount {
  max-height: 300px;
  padding: 30px;
  margin-left: 100px;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  box-sizing: border-box;
}

.v-profile__block {
  display: flex;
  flex-direction: column;


}

.v-order-item__image {
  width: 400px;
  height: 400px;
}
</style>