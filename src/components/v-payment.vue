<template>
  <div class="v-payment">
    <h1>Payment Methods</h1>
    <div class="shipping-info" v-if="paidFor===false">
      <div class="shipping-form">
        <h2>Shipping</h2>
        <h3>Please enter your shipping details.</h3>
        <div class="section section2">
          <input placeholder="First name">
          <input placeholder="Last name">
        </div>
        <div class="section">
          <input placeholder="Address">
        </div>
        <div class="section">
          <input placeholder="Country">
        </div>
        <div class="section section3">
          <input placeholder="ZIP Code">
          <input placeholder="City">
          <input placeholder="State">
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
    product: {
      price: 777.77,
      description: 'leg lamp from that one movie',
      img: '../assets/logo.png '
    }
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
                    description: this.product.description,
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
    display: block;
    padding-bottom: 25px;
  }

  .section2 {
    display: flex;
    flex-wrap: wrap;
  }

  .section3 {
    display: flex;
    flex-wrap: wrap;
  }

  .section2 input {
    max-width: 100px;
  }

  .section3 input {
    max-width: 66px;
  }

  .section input {
    border: 1px solid gray;
    text-align: center;
    min-width: 200px;
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
    padding: 20px 0px 20px 60px;
    margin-top: 40px;
    box-shadow: 0px 5px 15px rgba(62, 75, 102, 0.15);
    border: 1px solid #f3f3f3;
    border-radius: 15px;
  }
</style>