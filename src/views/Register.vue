<template>
  <div class="register-view">
    <div class="register-container">
      <v-layout column>
        <h2>Welcome to lesfieres Books &amp; Movies</h2>
        <v-layout column>
          <v-text-field v-model="username" label="username" class="login-input"/>
          <v-text-field v-model="password" label="password" type="password" class="login-input"/>
          <v-btn flat @click="register">Register</v-btn>
        </v-layout>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'home' });
        });
    },
  },
};
</script>
<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.register-container {
  display: flex;
  flex: none;
  max-width: 360px;
  max-height: 360px;
}
</style>