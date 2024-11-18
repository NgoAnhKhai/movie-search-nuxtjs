<template>
  <v-container>
    <div v-if="status === 'pending'">
      <v-row>
        <v-col cols="6">
          <v-skeleton-loader
            class="mx-auto border"
            width="100%"
            height="321"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="6">
          <v-skeleton-loader
            class="mx-auto border"
            width="100%"
            height="321"
            type="article,list-item,chip"
            color="transparent"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row class="mt-5">
        <v-col cols="6" align="center ">
          <v-icon
            v-if="movie?.backdrop_path === null"
            size="100"
            style="height: 411px; width: 274px"
            >mdi-image-off</v-icon
          >
          <v-img
            :src="`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`"
            rounded
          ></v-img>
        </v-col>
        <v-col cols="6">
          <div>
            <p class="text-h4">{{ movie?.title }}</p>
            <!-- Biểu tượng trái tim -->
            <v-btn class="custom-login-btn" @click="toggleFavorite">
              {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
            </v-btn>
            <!-- LoginPrompt Component -->
            <LoginPrompt v-if="showLoginPrompt" />
          </div>
          <div class="d-flex ga-4">
            <span class="text-subtitle-1 text-grey"
              >{{ movie?.release_date }} - {{ movie?.runtime }} -
              {{ movie?.budget }}
            </span>
          </div>
          <v-chip
            v-for="(genre, index) in movie?.genres"
            :key="index"
            variant="outlined"
            class="mr-2 mt-1 mr-1 text-subtitle-1"
            >{{ genre }}</v-chip
          >
          <ScoreCircle
            v-if="movie?.vote_average !== undefined"
            :score="movie.vote_average"
            class="mt-4"
          />
          <p>{{ movie?.overview }}</p>
        </v-col>
      </v-row>

      <p class="text-h4">Cast</p>
      <v-row dense no-gutters>
        <v-col class="d-flex flex-wrap ga-2">
          <v-card
            v-for="(card, index) in movie?.cast"
            :key="index"
            width="180px"
          >
            <v-icon
              class="ml-15"
              v-if="card?.profile_path === null"
              size="100"
              style="height: 150px; width: 100%px"
              >mdi-image-off</v-icon
            >
            <v-img
              :src="`http://image.tmdb.org/t/p/original/${card.profile_path}`"
              width="100%"
              height="288"
            ></v-img>
            <v-card-text class="pa-1">
              <p class="font-weight-bold text-subtitle-1">{{ card.name }}</p>
              <p>{{ card.character }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <iframe
            ref="el"
            :src="movie?.videos"
            frameborder="0"
            width="100%"
            :height="height"
            :title="movie?.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyposcope; picture-in-picture;web-share"
            allowfullscreen
            class="rounded"
          ></iframe>
        </v-col>
      </v-row>
    </div>
    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      color="success"
      elevation="3"
    >
      {{ snackbar.message }}
      <template #actions>
        <v-btn icon @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRuntimeConfig, useFetch } from "#app";
import ScoreCircle from "~/components/movieDetails/ScoreCircle.vue";
import { ref, computed } from "vue";
import { useFavoritesStore } from "~/store/favorites";
import { useAuthStore } from "~/store/authStore";

interface Cast {
  profile_path: string;
  name: string;
  character: string;
}

interface Credits {
  cast: Cast[];
}

interface Genres {
  id: number;
  name: string;
}
interface Video {
  results: VideoResult[];
}

interface VideoResult {
  key: string;
  name: string;
}

interface Movie {
  id: number;
  backdrop_path: string;
  cast: Cast[];
  title: string;
  release_date: string;
  runtime: number;
  credits: Credits;
  budget: number;
  genres: Genres[];
  vote_average: number;
  overview: string;
  videos: Video;
}
const showLoginPrompt = ref(false);
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();

const isFavorite = computed(() =>
  favoritesStore.isFavorite(movie.value?.id || 0)
);

const snackbar = ref({
  show: false,
  message: "",
});

function toggleFavorite() {
  if (!authStore.isAuthenticated) {
    showLoginPrompt.value = true; // Hiển thị thông báo đăng nhập
    return;
  }
  if (!movie.value) return;

  if (isFavorite.value) {
    favoritesStore.removeFavorite(movie.value.id);
    snackbar.value = {
      show: true,
      message: "Removed from Favorites!",
    };
  } else {
    favoritesStore.addFavorite({
      id: movie.value.id,
      title: movie.value.title,
      poster_path: movie.value.poster_path,
      release_date: movie.value.release_date,
      vote_average: movie.value.vote_average,
    });
    snackbar.value = {
      show: true,
      message: "Added to Favorites!",
    };
  }
}

const { data: movie, status } = await useFetch(
  `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${runtimeConfig.public.apiKey}&append_to_response=videos,credits`,
  {
    transform(input: Movie) {
      const runtimeHours = Math.floor(input.runtime / 60);
      const runtimeMinutes = input.runtime % 60;
      return {
        id: input.id,
        backdrop_path: input.backdrop_path,
        poster_path:
          input.backdrop_path || "https://via.placeholder.com/500x750",
        title: input.title,
        release_date: new Date(input.release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        runtime: `${runtimeHours}h ${runtimeMinutes}min`,
        credits: input.credits,
        budget: input.budget.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        }),
        genres: input.genres.map((genre) => genre.name),
        vote_average: input.vote_average,
        overview: input.overview,
        videos: `https://www.youtube.com/embed/${
          input.videos.results[
            input.videos.results.findIndex((video) =>
              video.name.toLowerCase().includes("trailer")
            )
          ].key
        }`,
        cast: input.credits.cast.filter((_, index) => index < 8),
      };
    },
  }
);

const el = ref(null);
const { width } = useElementSize(el);
const height = computed(() => (315 * width.value) / 560);
</script>
<style>
.custom-login-btn {
  background-color: #e63946; /* Màu đỏ tương tự giao diện hiện tại */
  color: white; /* Màu chữ */
  font-weight: bold;
}

.custom-login-btn:hover {
  background-color: #d62839; /* Màu hover */
}
</style>
