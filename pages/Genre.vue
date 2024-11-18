<template>
  <v-container>
    <h2 class="text-h4 mt-8 mb-6">Genres</h2>
    <v-row>
      <v-col v-for="genre in genres" :key="genre.id" cols="3">
        <v-card
          class="position-relative cursor-pointer"
          @click="goToGenreMovies(genre.id, genre.name)"
        >
          <v-card-title>{{ genre.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const genres = ref<Genre[]>([]);
const router = useRouter();
const config = useRuntimeConfig();
interface Genre {
  id: number;
  name: string;
}

async function fetchGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${config.public.apiKey}&language=en-US`
    );
    const data = await response.json();
    genres.value = data.genres; // Gán dữ liệu vào genres
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

function goToGenreMovies(genreId: number, genreName: string) {
  router.push({
    path: `/genre/${genreId}`,
    query: { name: genreName },
  });
}

onMounted(() => {
  fetchGenres();
});
</script>

<style scoped>
.v-card {
  max-width: 300px;
  margin-bottom: 16px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
}
</style>
