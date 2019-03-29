<template>
  <v-container id="books-container" grid-list-sm fluid>
    <v-flex>
      <v-text-field
        v-model="inputSearch"
        append-icon="search"
        label="Search"
        md3
        xs12
        sm6
        @keyup.enter="search()"
      />
    </v-flex>
    <v-layout justify-end>
      <v-btn :color="mode === 'line' ? '#1976d2' : ''" icon @click="resize('line')">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn :color="mode === 'grid' ? '#1976d2' : ''" icon @click="resize('grid')">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn :color="mode === 'card' ? '#1976d2' : ''" icon @click="resize('card')">
        <v-icon>assignment</v-icon>
      </v-btn>
    </v-layout>
    <v-layout v-if="performingSearch" justify-center>
      <v-progress-circular color="#1976d2" indeterminate size="45"/>
    </v-layout>
    <v-layout v-if="!performingSearch" row wrap>
      <!-- eslint-disable vue/attribute-hyphenation -->
      <v-flex
        v-for="book in books"
        :key="book.id"
        :[dynamicSizeXs]="true"
        :[dynamicSizeSm]="true"
        :[dynamicSizeMd]="true"
        :[dynamicSizeLg]="true"
        :[dynamicSizeXl]="true"
        d-flex
        pa-2
      >
        <BookCard :book="book" :mode="mode"/>
      </v-flex>
      <!-- eslint-enable vue/attribute-hyphenation -->
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable vue/attribute-hyphenation */
import axios from 'axios';
import _ from 'lodash';
import BookCard from '../components/BookCard';

export default {
  components: {
    BookCard,
  },
  data() {
    return {
      books: [],
      inputSearch: '',
      debouncedSearch: null,
      searchTimeStamp: null,
      performingSearch: false,
      mode: 'card',
      dynamicSizeXs: 'xs4',
      dynamicSizeSm: 'sm3',
      dynamicSizeMd: 'md3',
      dynamicSizeLg: 'lg2',
      dynamicSizeXl: 'xl1',
    };
  },
  watch: {
    inputSearch() {
      this.debouncedSearch();
    },
  },
  mounted() {
    this.debouncedSearch = _.debounce(this.search.bind(this), 300);
    this.resize('card');
  },
  methods: {
    resize(mode) {
      this.mode = mode;
      if (mode === 'line') {
        this.dynamicSizeXs = 'xs12';
        this.dynamicSizeSm = 'sm12';
        this.dynamicSizeMd = 'md12';
        this.dynamicSizeLg = 'lg12';
        this.dynamicSizeXl = 'xl12';
      } else if (mode === 'grid') {
        this.dynamicSizeXs = 'xs6';
        this.dynamicSizeSm = 'sm4';
        this.dynamicSizeMd = 'md4';
        this.dynamicSizeLg = 'lg3';
        this.dynamicSizeXl = 'xl2';
      } else {
        // card
        this.dynamicSizeXs = 'xs12';
        this.dynamicSizeSm = 'sm6';
        this.dynamicSizeMd = 'md6';
        this.dynamicSizeLg = 'lg4';
        this.dynamicSizeXl = 'xl4';
      }
    },
    search() {
      this.searchTimeStamp = new Date().toLocaleTimeString();
      const timeStamp = this.searchTimeStamp;
      this.performingSearch = true;
      axios
        .get(`http://localhost:8081/search-book?title=%22${this.inputSearch}%22&from=1&to=3`)
        .then(books => {
          if (timeStamp === this.searchTimeStamp) {
            this.books = books.data;
            this.performingSearch = false;
          }
        })
        .catch(error => {
          if (timeStamp === this.searchTimeStamp) {
            this.performingSearch = false;
            console.log('error on search-book', JSON.stringify(error));
          }
        });
    },
  },
};
</script>
