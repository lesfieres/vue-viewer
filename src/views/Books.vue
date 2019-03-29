<template>
  <v-container id="books-container" grid-list-sm fluid>
    <v-flex>
      <v-text-field v-model="inputSearch"
                    append-icon="search"
                    label="Search"
                    md3 xs12 sm6 
                    @keyup.enter="search()"         
      />
    </v-flex>
    <v-layout row wrap>
      <v-flex
        v-for="book in books"
        :key="book.id"
        xs5 sm3 md3 lg2 xl1
        d-flex
      >
        <v-card flat tile class="d-flex">
          <v-img
            :src="`${book.image_url}`"
            :lazy-src="`${book.small_image_url}`"
            :alt="`${book.title} (${book.author.name})`"
            :title="`${book.title} (${book.author.name})`"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-cent
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"/>
              </v-layout>
            </template>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
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
      inputSearch() {
        this.debouncedSearch()
      }
    },
    mounted() {
      this.debouncedSearch = _.debounce(this.search.bind(this), 300)
    },
    methods: {
      search () {
        axios.get(`http://localhost:8081/search-book?title=%22${this.inputSearch}%22&from=1&to=3`).then((books) => {
          this.books = books.data; 
        })
        .catch((error) => {
          console.log("error on search-book", JSON.stringify(error));
        });
      }
    }
  }

</script>
