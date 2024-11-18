<template>
  <v-row>
    <v-col
      v-for="movie in moviesStore.movies?.results"
      :key="movie.id"
      cols="3"
    >
      <v-card
        class="position-relative cursor-pointer uniform-card"
        color="dark"
        @click="$router.push(`/${movie.id}`)"
      >
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          rounded="lg"
        ></v-img>
        <div class="score-circle">
          <ScoreCircle :score="movie.vote_average" />
        </div>
        <v-card-text class="px-0">
          <p class="text-h6 mt-1">
            {{ movie.title }}
          </p>
          <p class="text-grey text-body-1">
            {{ movie.release_date }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useMoviesStore } from "@/store/movies";
const moviesStore = useMoviesStore();
</script>
