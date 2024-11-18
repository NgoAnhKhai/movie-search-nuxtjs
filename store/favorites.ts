import { defineStore } from "pinia";
import { ref } from "vue";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Movie[]>([]);

  function addFavorite(movie: Movie) {
    if (!movie.poster_path) {
      movie.poster_path = "https://via.placeholder.com/500x750"; // Giá trị mặc định
    }
    if (!favorites.value.some((fav) => fav.id === movie.id)) {
      favorites.value.push(movie);
    }
  }

  function removeFavorite(movieId: number) {
    if (!movieId) return; // Nếu movieId là null, không thực hiện gì
    favorites.value = favorites.value.filter((fav) => fav.id !== movieId);
  }

  function isFavorite(movieId: number) {
    return favorites.value.some((fav) => fav.id === movieId);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
});
