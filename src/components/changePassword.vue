<template>
  <v-form @submit.prevent="changedPassword">
    <div class="block-form">
      <v-col cols="12" md="12">
        <v-text-field
          class="input-custom"
          :class="v$.changes.password.$error ? 'input-invalid' : ''"
          v-model.trim="changes.password"
          :counter="10"
          type="password"
          label="Изменение пароля"
          required
        ></v-text-field>
        <span class="span-invalid" v-if="v$.changes.password.$error"
          >Пароль введен неверно</span
        >
      </v-col>
      <button
        class="btn-orange"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        Сменить
      </button>
      <div class="buttons-setting">
        <button class="btn-cancel" @click="closeModal">Закрыть</button>
        <button class="btn-orange" @click="closeChangePass">
          Закрыть изменение пароля
        </button>
      </div>
    </div>
  </v-form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "app-settings",
  data: () => ({
    changes: {
      password: "",
    },
  }),
  setup: () => ({ v$: useValidate() }),
  validations() {
    return {
      changes: {
        password: { required },
      },
    };
  },
  methods: {
    changedPassword() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const newPassword = {
          password: this.changes.password,
        };
        this.$store.dispatch("changePassword", newPassword).then(() => {
          this.v$.$reset();
          this.changes.password = "";
        });
      }
    },
    closeModal() {
      this.$store.dispatch("setShowDialog");
    },
    closeChangePass() {
      this.$store.dispatch("setChangePassword");
      this.$store.dispatch("setChangeEmail");
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>
