<template>
  <div>
    <v-card :class="{ 'book-card' : mode !== 'grid', 'book-card-grid' : mode === 'grid' }">
      <v-layout>
        <div class="image-container" xs5>
          <v-img
            :src="book.image_url"
            :lazy-src="book.small_image_url"
            :alt="`${book.title} (${book.author.name})`"
            :title="`${book.title} (${book.author.name})`"
            height="125px"
            width="125px"
            class="image"
            contain
          >
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"/>
              </v-layout>
            </template>
          </v-img>
        </div>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline title">{{ book.title }}</div>
              <div class="grey--text author">{{ book.author.name }}</div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider v-if="mode !== 'grid'" light/>
      <v-card-actions v-if="mode !== 'grid'" pa-3>
        Rate this book
        <v-spacer/>
        <div class="star-container" @mouseleave="lightStars(0)">
          <v-icon
            v-for="(star, index) in stars"
            :key="index"
            :color="star.color"
            @mouseover="lightStars(index + 1)"
          >{{ star.icon }}</v-icon>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lightedStars: 0,
    };
  },
  computed: {
    stars() {
      return Array.from({ length: 5 }, (item, index) => {
        if (index >= this.lightedStars) {
          return { icon: 'star_border', color: '' };
        }
        return { icon: 'star', color: 'yellow' };
      });
    },
  },
  methods: {
    lightStars(number) {
      this.lightedStars = number;
    },
  },
};
</script>
<style scoped>
.book-card {
  display: flex !important;
  flex-direction: column;
  height: 100%;
  transition: none;
}
.book-card-grid {
  display: flex !important;
  flex-direction: row;
  height: 160px;
  transition: none;
}
.image-container {
  display: flex;
  padding: 6px 0;
}
.image {
  align-self: center;
}
.title {
  max-height: 82px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}
.author {
  display: flex;
  max-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
}
.star-container {
  cursor: pointer;
}
</style>