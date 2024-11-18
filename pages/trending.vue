<template>
  <v-container>
    <h2 class="text-h4 mt-8 mb-6">Trending Movies</h2>

    <SkeletonCard v-if="moviesStore.loading" />
    <TrendingCard />
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
import { useMoviesStore } from "~/store/movies";
import SkeletonCard from "~/feature/SkeletonCard.vue";
import TrendingCard from "~/feature/TrendingCard.vue";
const moviesStore = useMoviesStore();

function handlePageChange(newPage) {
  moviesStore.page = newPage;
  moviesStore.fetchTrendingMovies();
}

onMounted(() => {
  moviesStore.page = 1;
  moviesStore.fetchTrendingMovies();
});
</script>

<style scoped>
.v-container {
  padding: 16px;
}
</style>
