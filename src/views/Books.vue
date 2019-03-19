<template>
  <v-container>
    <v-flex v-for="book in books" :key="book.id">{{ book.title }}</v-flex>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        books: []
      }
    },
    mounted() {
      axios.get('http://localhost:8081/search?title=%22ender%22&from=1&to=3').then((books) => {
        this.books = books.data; 
      })
    }
  }
</script>
