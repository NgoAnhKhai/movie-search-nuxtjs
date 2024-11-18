<!-- feature/MovieCard.vue -->
<template>
  <v-row>
    <v-col
      v-for="(card, index) in moviesStore.movies?.results"
      :key="index"
      cols="3"
    >
      <v-card
        class="position-relative cursor-pointer"
        color="light-black"
        @click="$router.push(`/${card.id}`)"
      >
        <v-icon
          v-if="card.poster_path === null"
          style="height: 280px; width: 174px"
        >
          mdi-image-off
        </v-icon>
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${card.poster_path}`"
          rounded="lg"
        ></v-img>
        <ScoreCircle :score="card.vote_average" />
        <v-card-text class="px-0">
          <p class="text-h6 mt-1">
            {{ titleString(card.title) }}
          </p>
          <p class="text-grey text-body-1">{{ card.release_date }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useMoviesStore } from "~/store/movies";
import ScoreCircle from "../components/global/ScoreCircle.vue";

function titleString(title: string) {
  return `${title.substring(0, 5)} ${title.length > 5 ? "..." : ""} `;
}
const moviesStore = useMoviesStore();
</script>
