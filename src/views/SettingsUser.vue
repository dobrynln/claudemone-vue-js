<template>
  <div class="settings-modal">
    <div class="block-form settings-form">
      <h3 class="settings-h3">Редактирование профиля</h3>
      <v-form @submit.prevent="changedEmail" v-if="changeFlagEmail">
        <div class="block-form">
          <v-col cols="12" md="12">
            <v-text-field
              class="input-custom"
              :class="v$.changes.email.$error ? 'input-invalid' : ''"
              v-model.trim="changes.email"
              label="Изменение e-mail"
              type="email"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.changes.email.$error"
              >E-mail введен неверно</span
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
        </div>
        <div class="buttons-setting">
          <button class="btn-cancel" @click="closeModal">Закрыть</button>
          <button class="btn-orange" @click="changePass">
            Изменение пароля
          </button>
        </div>
      </v-form>
      <change-password v-if="changeFlagPassword"></change-password>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
import changePassword from "../components/changePassword.vue";
export default {
  name: "app-settings",
  data: () => ({
    changes: {
      email: "",
    },
  }),
  components: {
    "change-password": changePassword,
  },
  setup: () => ({ v$: useValidate() }),
  validations() {
    return {
      changes: {
        email: { required, email },
      },
    };
  },
  methods: {
    ...mapActions["setChangePassword"],
    changedEmail() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const newEmail = {
          email: this.changes.email,
        };
        this.$store.dispatch("changeEmail", newEmail).then(() => {
          this.v$.$reset();
          this.changes.email = "";
        });
      }
    },
    closeModal() {
      this.$store.dispatch("setShowDialog");
    },
    changePass() {
      this.$store.dispatch("setChangePassword");
      this.$store.dispatch("setChangeEmail");
    },
  },
  computed: {
    ...mapGetters([
      "showFlagDialog",
      "loading",
      "changeFlagPassword",
      "changeFlagEmail",
    ]),
  },
};
</script>
