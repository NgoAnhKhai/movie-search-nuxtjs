<template>
  <v-container>
    <p class="text-h4 mt-8 mb-6">Feature Today</p>

    <SkeletonCard v-if="moviesStore.loading" />

    <MovieCard v-else />

    <v-pagination
      v-if="moviesStore.movies?.total_pages !== 1"
      v-model="moviesStore.page"
      :length="Math.min(moviesStore.movies?.total_pages ?? 1, 100)"
      class="my-4"
      @update:modelValue="moviesStore.searchMovies"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useMoviesStore } from "~/store/movies";
import MovieCard from "~/feature/MovieCard.vue";

import SkeletonCard from "~/feature/SkeletonCard.vue";

const moviesStore = useMoviesStore();

onBeforeMount(() => {
  moviesStore.featureMovies();
});
</script>
