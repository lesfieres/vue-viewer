<template>
  <v-container grid-list-sm fluid>
    <v-layout column>
      <h2>List of users</h2>
      <v-list two-line>
        <template v-for="user in users">
          <v-list-tile :key="user.username">
            <v-list-tile-content>
              <v-list-tile-title>Username: {{ user.username }}</v-list-tile-title>
              <v-list-tile-sub-title>Password: {{ user.password }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  /* eslint-disable object-shorthand */
  /* eslint-disable func-names */
  watch: {
    loggedIn: function(loggedIn) {
      if (!loggedIn) {
        this.$router.push({ name: 'home' });
      }
    },
  },
  /* eslint-enable object-shorthand */
  /* eslint-enable func-names */
  mounted() {
    this.$store
      .dispatch('users')
      .then(users => {
        this.users = users;
      })
      .catch(() => {
        this.$router.push({ name: 'home' });
      });
  },
};
</script>