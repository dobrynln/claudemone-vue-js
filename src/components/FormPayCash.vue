<template>
  <v-form @submit.prevent="checkFormCash">
    <div class="form-payment">
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.form.nameUser.$error ? 'input-invalid' : ''"
          v-model.trim="form.nameUser"
          label="Введите ваше имя"
          type="text"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.form.nameUser.$error"
          >Имя введено неверно</span
        >
      </v-col>
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.form.phoneUser.$error ? 'input-invalid' : ''"
          v-model.trim="form.phoneUser"
          :counter="11"
          label="Введите ваш номер телефона"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.form.phoneUser.$error"
          >Номер телефона введен неверно</span
        >
      </v-col>
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
  name: "form-cash",
  data: () => ({
    form: {
      nameUser: "",
      phoneUser: "",
      userAdress: "",
    },
  }),
  setup: () => ({ v$: useValidate() }),
  validations() {
    return {
      form: {
        nameUser: { required },
        phoneUser: { required },
        userAdress: { required },
      },
    };
  },
  methods: {
    ...mapActions(["setShowCart"]),
    checkFormCash() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("CashFormEmit");
        console.log("ok");
      } else {
        console.log("not ok");
      }
    },
  },
  computed: {},
};
</script>
