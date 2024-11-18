<template>
  <v-row>
    <v-col v-for="(card, index) in 12" :key="index" cols="3">
      <v-skeleton-loader
        class="mx-auto border"
        max-width="350"
        height="411"
        type="card-avatar"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useMoviesStore } from "~/store/movies";

const moviesStore = useMoviesStore();
</script>
