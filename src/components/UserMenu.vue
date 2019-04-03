<template>
  <v-layout justify-end class="js-user-menu">
    <div v-if="!loggedIn && !loginFormVisible" class="flex-none">
      <v-btn flat @click="loginFormVisible = true">Login</v-btn>
      <v-btn flat @click="$router.push({ name: 'register' })">Register</v-btn>
    </div>
    <v-layout v-if="!loggedIn && loginFormVisible" row class="flex-none">
      <v-text-field v-model="loginForm.username" label="username" class="login-input ml-2"/>
      <v-text-field
        v-model="loginForm.password"
        label="password"
        type="password"
        class="login-input ml-2"
      />
      <v-btn flat @click="login">Login</v-btn>
      <v-btn flat @click="loginFormVisible = false;">Cancel</v-btn>
    </v-layout>
    <v-layout v-if="loggedIn" row align-center class="flex-none">
      <span>Welcome {{ username }},&nbsp;</span>
      <a href="#" @click.prevent="logout">Logout</a>
    </v-layout>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loginFormVisible: false,
      loginForm: {
        username: undefined,
        password: undefined,
      },
    };
  },
  computed: {
    ...mapGetters(['loggedIn', 'username']),
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then(() => {
          this.loginFormVisible = false;
        });
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.loginFormVisible = false;
      });
    },
  },
};
</script>
<style scoped>
.flex-none {
  display: flex;
  flex: none;
}
.login-input {
  max-height: 50px;
  max-width: 120px;
}
</style>