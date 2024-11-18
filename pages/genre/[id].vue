<template>
  <v-container>
    <h2 class="text-h4 mt-8 mb-6">Movies in {{ genreName }}</h2>
    <SkeletonCard v-if="moviesStore.loading" />
    <GenreCard v-else />
    <v-pagination
      v-model="moviesStore.page"
      :length="Math.min(moviesStore.movies?.total_pages ?? 1, 100)"
      class="my-4"
      @update:modelValue="handlePageChange"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "@/store/movies";
import GenreCard from "~/feature/GenreCard.vue";
import SkeletonCard from "~/feature/SkeletonCard.vue";

const route = useRoute();
const moviesStore = useMoviesStore();

const genreId = route.params.id;
const genreName = route.query.name;
function handlePageChange(newPage) {
  moviesStore.page = newPage;
  moviesStore.fetchMoviesByGenre(genreId);
}
onMounted(() => {
  moviesStore.page = 1;
  moviesStore.fetchMoviesByGenre(genreId);
});
</script>

<style scoped>
.v-container {
  padding: 16px;
}
.v-card {
  max-width: 300px;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1e1e1e;
  color: #fff;
}
.v-img {
  object-fit: cover;
}
.v-card-subtitle {
  font-size: 0.9rem;
  color: #bdbdbd;
}
.v-card-title {
  font-size: 1.1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card-actions {
  align-items: center;
}
</style>
