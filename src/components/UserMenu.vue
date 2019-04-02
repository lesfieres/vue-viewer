<template>
  <v-layout justify-end class="js-user-menu">
    <div v-if="!loggedIn && !loginFormVisible" class="flex-none">
      <v-btn flat @click="loginFormVisible = true">Login</v-btn>
      <v-btn flat @click="$router.push({ name: 'register' })">Register</v-btn>
    </div>
    <v-layout v-if="!loggedIn && loginFormVisible" row class="flex-none">
      <v-text-field v-model="username" label="username" class="login-input"/>
      <v-text-field v-model="password" label="password" type="password" class="login-input"/>
      <v-btn flat @click="login">Login</v-btn>
      <v-btn flat @click="loginFormVisible = false;">Cancel</v-btn>
    </v-layout>
    <v-layout v-if="loggedIn" row align-center class="flex-none">
      <span>Welcome {{ user }},&nbsp;</span>
      <a href="#" @click.prevent="logout">Logout</a>
    </v-layout>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      loginFormVisible: false,
      username: undefined,
      password: undefined,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.username;
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
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
  margin-left: 8px !important;
}
</style>