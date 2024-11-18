<template>
  <v-row>
    <v-col v-for="movie in favoritesStore.favorites" :key="movie.id" cols="3">
      <v-card
        class="position-relative cursor-pointer uniform-card"
        color="dark"
        @click="$router.push(`/${movie.id}`)"
      >
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          rounded="lg"
          height="300px"
          width="100%"
        ></v-img>
        <v-card-text class="px-0">
          <p class="text-h6 mt-1 text-truncate">{{ movie.title }}</p>
          <p class="text-body-2">{{ movie.release_date }}</p>
          <p class="text-body-1">Rating: {{ movie.vote_average }}</p>
        </v-card-text>
        <v-btn
          color="error"
          class="mt-2"
          @click.stop="removeFavorite(movie.id)"
        >
          Remove
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useFavoritesStore } from "~/store/favorites";
const favoritesStore = useFavoritesStore();

function removeFavorite(movieId) {
  favoritesStore.removeFavorite(movieId);
}
</script>
