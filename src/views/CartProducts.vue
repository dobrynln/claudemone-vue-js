<template>
  <section class="cart">
    <button class="close-cart" @click="closeCart">X</button>
    <div class="cart-left">
      <h3 class="cart-h3">Корзина</h3>
      <div class="cart-box" v-if="cart_data.length">
        <app-item-cart
          v-for="(item, i) in cart_data"
          :key="i"
          :cart_item_data="item"
          @deleteItemCart="deleteItemCart(i)"
          @decrementCart="decrementCart(i)"
          @incrementCart="incrementCart(i)"
        />
      </div>
      <div class="cart-zero" v-else>Ваша корзина пуста :(</div>
      <div class="cart-box__bottom" v-if="cart_data.length">
        <span class="total-price"
          >Общая сумма заказа: <span>{{ cartTotal }}₽</span></span
        >
        <button class="btn-orange" @click="showPay" v-if="nextPay">
          Продолжить оплату
        </button>
      </div>
    </div>
    <div class="cart-right" v-if="payment">
      <h3 class="cart-h3">Оплата</h3>
      <div class="payment-success" v-if="success">
        <div class="payment-success__circle">
          <img
            src="../assets/success.svg"
            alt="Успешно"
            class="image-success"
          />
        </div>
        <span class="payment-success__descr">Ваш заказ принят!</span>
        <button class="btn-orange" @click="setShowCart">Понял, спасибо!</button>
      </div>
      <div class="payment-block" v-if="paymentBlock">
        <div class="payment-tab">
          <button
            class="payment-tab__item"
            @click.prevent="setActivePayment('bank')"
            :class="{ 'active-payment': isActive('bank') }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.75 9C1.75 6.37665 3.87665 4.25 6.5 4.25H18.5C21.1234 4.25 23.25 6.37665 23.25 9V15C23.25 17.6234 21.1234 19.75 18.5 19.75H6.5C3.87665 19.75 1.75 17.6234 1.75 15V9ZM3.33697 8.25H21.663C21.3245 6.81665 20.0368 5.75 18.5 5.75H6.5C4.96321 5.75 3.67555 6.81665 3.33697 8.25ZM21.75 9.75H3.25V15C3.25 16.7949 4.70507 18.25 6.5 18.25H18.5C20.2949 18.25 21.75 16.7949 21.75 15V9.75ZM13.75 15C13.75 14.5858 14.0858 14.25 14.5 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15C19.25 15.4142 18.9142 15.75 18.5 15.75H14.5C14.0858 15.75 13.75 15.4142 13.75 15Z"
                fill="#ABBBC2"
              />
            </svg>
            <span class="payment-tab__item-descr">Банковская карта</span>
          </button>
          <button
            class="payment-tab__item"
            @click.prevent="setActivePayment('cash')"
            :class="{ 'active-payment': isActive('cash') }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.688 0.5C17.8978 0.5 20.5 3.16116 20.5 6.44374V13.5563C20.5 16.8388 17.8978 19.5 14.688 19.5H6.31204C3.10219 19.5 0.5 16.8388 0.5 13.5563V6.44374C0.5 3.16116 3.10219 0.5 6.31204 0.5H14.688ZM14.688 1.98651H6.31204C3.90498 1.98651 1.95358 3.98213 1.95358 6.44374V13.5563C1.95358 16.0179 3.90498 18.0135 6.31204 18.0135H14.688C17.095 18.0135 19.0464 16.0179 19.0464 13.5563L19.046 13.279L15.8499 13.2798C14.0084 13.2787 12.5159 11.7531 12.5147 9.86949C12.5147 8.04914 13.9101 6.56244 15.6673 6.46431L15.8504 6.45916L19.046 6.459L19.0464 6.44374C19.0464 4.05454 17.2081 2.10431 14.8991 1.99165L14.688 1.98651ZM19.046 7.945L15.8508 7.94567C14.8109 7.94632 13.9683 8.80743 13.9683 9.86904C13.9689 10.8811 14.7329 11.7102 15.7033 11.7874L15.8504 11.7933L19.046 11.793V7.945ZM16.2942 9.06518C16.6956 9.06518 17.021 9.39795 17.021 9.80844C17.021 10.1847 16.7475 10.4957 16.3928 10.5449L16.2942 10.5517H15.9921C15.5907 10.5517 15.2653 10.2189 15.2653 9.80844C15.2653 9.43215 15.5388 9.12118 15.8935 9.07196L15.9921 9.06518H16.2942ZM10.8539 4.99736C11.2553 4.99736 11.5807 5.33013 11.5807 5.74062C11.5807 6.1169 11.3073 6.42788 10.9525 6.47709L10.8539 6.48388H5.62203C5.22063 6.48388 4.89524 6.15111 4.89524 5.74062C4.89524 5.36434 5.16866 5.05337 5.5234 5.00415L5.62203 4.99736H10.8539Z"
                fill="#ABBBC2"
              />
            </svg>
            <span class="payment-tab__item-descr">Наличные</span>
          </button>
        </div>
        <div class="payment-boxs">
          <div
            class="payment-boxs__content payment-boxs__content-bank"
            :class="{ 'payment-box': isActive('bank') }"
          >
            <app-form-bank @bankFormEmit="bankFormEmit"></app-form-bank>
          </div>
          <div
            class="payment-boxs__content payment-boxs__content-cash"
            :class="{ 'payment-box': isActive('cash') }"
          >
            <app-form-cash
              v-if="blockCash"
              @CashFormEmit="CashFormEmit"
            ></app-form-cash>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import CartProductsItem from "../components/CartProductsItem.vue";
import FormCash from "../components/FormPayCash";
import FormBank from "../components/FormPayBank.vue";
export default {
  name: "app-cart",
  components: {
    "app-item-cart": CartProductsItem,
    "app-form-cash": FormCash,
    "app-form-bank": FormBank,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data: () => ({
    payment: false,
    nextPay: true,
    activeBoxs: "bank",
    blockCash: false,
    success: false,
    paymentBlock: true,
    form: {
      cardName: "",
      cardNumber: "",
      cardDate: "",
      cardCvv: "",
      userAdress: "",
    },
  }),
  setup: () => ({ v$: useValidate() }),
  validations() {
    return {
      form: {
        cardName: { required },
        cardNumber: { required },
        cardDate: { required },
        cardCvv: { required },
        userAdress: { required },
      },
    };
  },
  methods: {
    ...mapActions([
      "deleteFromCart",
      "incrementItem",
      "decrementItem",
      "setShowCart",
    ]),
    bankFormEmit() {
      this.success = true;
      this.paymentBlock = false;
      this.cart_data.splice(0, this.cart_data.length);
    },
    CashFormEmit() {
      this.success = true;
      this.paymentBlock = false;
      this.cart_data.splice(0, this.cart_data.length);
    },
    deleteItemCart(i) {
      if (this.cart_data.length !== 0) {
        this.deleteFromCart(i);
      }
      if (this.cart_data.length === 0) {
        this.setShowCart();
      }
    },
    isActive(menuItem) {
      return this.activeBoxs === menuItem;
    },
    setActivePayment(menuItem) {
      this.activeBoxs = menuItem;
      this.blockCash = true;
    },
    showPay() {
      this.payment = true;
      this.nextPay = false;
    },
    decrementCart(i) {
      this.decrementItem(i);
    },
    incrementCart(i) {
      this.incrementItem(i);
    },
    checkFormBank() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("ok");
      } else {
        console.log("not ok");
      }
    },
    closeCart() {
      this.setShowCart();
    },
  },
  computed: {
    cartTotal() {
      let res = [];
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          res.push(item.price * item.quantity);
        }
        res = res.reduce(function (sum, el) {
          return sum + el;
        });
        return res;
      } else {
        return 0;
      }
    },
  },
};
</script>
