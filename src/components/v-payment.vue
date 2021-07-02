<template>
  <div class="v-payment">
    <h1>Payment Methods</h1>
    <div class="shipping-info" v-if="paidFor===false">
      <div class="shipping-form">
        <h2>Shipping</h2>
        <h3>Please enter your shipping details.</h3>
        <div class="section section2">
          <input class="ship-input" placeholder="First name">
          <input class="ship-input" placeholder="Last name">
        </div>
        <div class="section section1">
          <input class="ship-input" id="country" v-model="country_data" placeholder="Country">
        </div>
        <div class="section section1">
          <input class="ship-input" id="address" v-model="address_data" placeholder="Address">
        </div>
        <div class="section section3">
          <input class="ship-input" placeholder="ZIP Code">
          <input class="ship-input" placeholder="City">
          <input class="ship-input" placeholder="State">
        </div>
        <div ref="paypal"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "v-payment",
  data() {
  return {
    loaded: false,
    paidFor: false,
    address_data: '',
    country_data: '',
    shipping_data: ''
  }
},
  mounted: function () {
    const script = document.createElement("script");
    script.src =
        "https://www.paypal.com/sdk/js?currency=RUB&client-id=AZ8XqanCPUq0Y4neYZjgO_hxn_fpRlxfqrIRve12HuerQMLx3X8DnC2vaMI1NnpTSXZ19IW5QHYpwGlR";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  computed: {
    ...mapGetters({
      cart: 'cart',
      Total: 'Total',
      TotalPositions: 'TotalPositions'
    })
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "RUB",
                      value: Math.round(this.Total)
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              this.data;
              this.paidFor = true;
              console.log(order);
              console.log(this.cart);
              this.shipping_data = this.country_data + " " + this.address_data;
              this.$router.push('checkout');
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(this.$refs.paypal);

    }
  }
};
</script>

<style scoped>

.v-payment {
  position: relative;
}
  .section {
    display: flex;
    padding-bottom: 25px;
    margin: 0 auto;
  }

  .section1 {

  }

  .section2 {
    display: flex;
    flex-wrap: wrap;
  }

  .section3 {
    display: flex;
    flex-wrap: wrap;
  }

  .section1 input {
    width: 450px;
    margin: 0 auto;
  }

  .section2 input {
    max-width: 100px;
    margin: 0 auto;
  }

  .section3 input {
    max-width: 66px;
    margin: 0 auto;
  }

  .section input {
    border: 1px solid gray;
    text-align: center;
    min-width: 200px;
    border-radius: 15px;
  }

  .section input::placeholder {
     text-align: center;
   }
  .section input:focus {
    outline: none;
  }

  h1 {
    text-align: center;
  }

  .shipping-info {
    padding-bottom: 50px;
  }

  .shipping-form {
    padding: 20px 60px;
    margin-top: 40px;
    box-shadow: 0px 5px 15px rgba(62, 75, 102, 0.15);
    border: 1px solid #f3f3f3;
    border-radius: 15px;


  }

.shipping-form h2, h3{
  text-align: center;
}

  .ship-input {

  }
</style>