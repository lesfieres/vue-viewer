<template>
  <v-container>
    <v-flex v-for="book in books" :key="book.best_book[0].title[0]">{{ book.best_book[0].title[0] }}</v-flex>
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
