import { defineStore } from "pinia";
import { useDateFormat } from "@vueuse/core";
import { ref, type Ref } from "vue";
import { useMessageStore } from "../store/message";

interface Results {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface Movies {
  total_pages: number;
  total_results: number;
  results: Results[];
}

export const useMoviesStore = defineStore("movies", () => {
  const searchString: Ref<string> = ref("");
  const movies: Ref<Movies | null> = ref(null);
  const messageStore = useMessageStore();
  const page: Ref<number> = ref(1);
  const loading: Ref<boolean> = ref(false);

  async function featureMovies() {
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const res = await $fetch<Movies>(
        `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${runtimeConfig.public.apiKey}`
      );

      // Corrected assignment for movies with total_pages
      movies.value = {
        total_pages: 1,
        total_results: res.total_results,
        results: res.results.map((movie: Results) => ({
          ...movie,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMM YYYY",
            {
              locales: "en-US",
            }
          ).value,
        })),
      };
      loading.value = false;
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = String(error);
      loading.value = false;
    }
  }

  async function searchMovies() {
    if (!searchString.value) return;
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const res = await $fetch<Movies>(
        `https://api.themoviedb.org/3/search/movie?page=${page.value}&query=${searchString.value}&api_key=${runtimeConfig.public.apiKey}`
      );
      console.log("Search results:", res);

      movies.value = {
        total_pages: res.total_pages,
        total_results: res.total_results,
        results: res.results.map((movie: Results) => ({
          ...movie,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMM YYYY",
            {
              locales: "en-US",
            }
          ).value,
        })),
      };
      loading.value = false;
    } catch (error: any) {
      messageStore.showMessage = true;
      messageStore.message = String(error);
      loading.value = false;
    }
  }

  async function fetchMoviesByGenre(genreId: string) {
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const res = await $fetch<Movies>(
        `https://api.themoviedb.org/3/discover/movie?page=${page.value}&api_key=${runtimeConfig.public.apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
      );
      movies.value = {
        total_pages: res.total_pages,
        total_results: res.total_results,
        results: res.results.map((movie: Results) => ({
          ...movie,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMM YYYY",
            {
              locales: "en-US",
            }
          ).value,
        })),
      };
      loading.value = false;
    } catch (error) {
      messageStore.showMessage = true;
      messageStore.message = String(error);
      loading.value = false;
    }
  }
  async function fetchTrendingMovies() {
    try {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const response = await $fetch<Movies>(
        `https://api.themoviedb.org/3/trending/movie/week?page=${page.value}&api_key=${runtimeConfig.public.apiKey}&page=${page.value}`
      );

      movies.value = {
        total_pages: response.total_pages,
        total_results: response.total_results,
        results: response.results.map((movie: Results) => ({
          ...movie,
          release_date: movie.release_date
            ? useDateFormat(new Date(movie.release_date), "MMM YYYY", {
                locales: "en-US",
              }).value
            : "Unknown",
        })),
      };
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      messageStore.showMessage = true;
      messageStore.message =
        "Failed to fetch trending movies. Please try again.";
    } finally {
      loading.value = false;
    }
  }

  return {
    fetchTrendingMovies,
    fetchMoviesByGenre,
    featureMovies,
    movies,
    searchString,
    searchMovies,
    page,
    loading,
  };
});
