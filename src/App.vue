<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">Home</router-link>&nbsp;|
        <router-link to="/about">About</router-link>&nbsp;|
        <router-link id="toolbar-books-button" to="/books">Books</router-link>&nbsp;|
        <router-link to="/users">Users</router-link>
      </v-toolbar-title>
      <v-spacer/>
      <UserMenu/>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import UserMenu from './components/UserMenu';

export default {
  name: 'App',
  components: {
    UserMenu,
  },
  data() {
    return {
      //
    };
  },
};
</script>
