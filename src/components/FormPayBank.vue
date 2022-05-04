<template>
  <v-form @submit.prevent="checkFormBank">
    <div class="form-payment form-bank">
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.form.cardName.$error ? 'input-invalid' : ''"
          v-model.trim="form.cardName"
          label="Введите ФИО карты"
          type="text"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.form.cardName.$error"
          >ФИО карты введены неверно</span
        >
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.form.cardNumber.$error ? 'input-invalid' : ''"
          v-model.trim="form.cardNumber"
          :counter="16"
          label="Введите номер карты"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.form.cardNumber.$error"
          >Номер карты введен неверно</span
        >
      </v-col>
      <div class="inputs-block">
        <v-col cols="12" md="6">
          <v-text-field
            class="input-custom"
            :class="v$.form.cardDate.$error ? 'input-invalid' : ''"
            v-model.trim="form.cardDate"
            label="Введите срок карты"
            required
          ></v-text-field>
          <span class="span-invalid" v-if="v$.form.cardDate.$error"
            >Срок карты введен неверно</span
          >
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="input-custom"
            :class="v$.form.cardCvv.$error ? 'input-invalid' : ''"
            v-model.trim="form.cardCvv"
            label="Введите CVV карты"
            required
          ></v-text-field>
          <span class="span-invalid" v-if="v$.form.cardCvv.$error"
            >CVV карты введен неверно</span
          >
        </v-col>
      </div>
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.form.userAdress.$error ? 'input-invalid' : ''"
          v-model.trim="form.userAdress"
          label="Введите ваш адрес"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.form.userAdress.$error"
          >Адрес введен неверно</span
        >
      </v-col>
    </div>
    <div class="payment-buttons">
      <button class="btn-cancel" type="button" @click="setShowCart">
        Отменить оплату
      </button>
      <button class="btn-orange" type="submit">Продолжить оплату</button>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "form-bank",
  data: () => ({
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
    ...mapActions(["setShowCart"]),
    checkFormBank() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("bankFormEmit");
        console.log("ok");
      } else {
        console.log("not ok");
      }
    },
  },
};
</script>
