<template>
  <v-container>
    <v-flex>
      <v-text-field v-model="inputSearch"
                    append-icon="search"
                    label="Search"
                    md3 xs12 sm6 
                    @keyup.enter="search()"         
      />
    </v-flex>
    <v-flex v-for="book in books" :key="book.id">{{ book.title }}
    </v-flex>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';

  export default {
    data() {
      return {
        books: [],
        inputSearch: "",
        debouncedSearch: null,
      }
    },
    watch: {
      // eslint-disable-next-line object-shorthand
      inputSearch: function() {
        this.debouncedSearch()
      }
    },
    mounted() {
      this.debouncedSearch = _.debounce(this.search.bind(this), 300)
    },
    methods: {
      search () {
        axios.get(`http://localhost:8081/search?title=%22${this.inputSearch}%22&from=1&to=1`).then((books) => {
          this.books = books.data; 
        })
      }
    }
  }

</script>
