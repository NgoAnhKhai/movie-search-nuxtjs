<!-- pages/Favorite.vue -->
<template>
  <v-container>
    <!-- Use the LoginPrompt component -->
    <LoginPrompt v-if="!authStore.isAuthenticated" />

    <!-- Display favorites only if the user is authenticated -->
    <div v-else>
      <h2 class="text-h4 mt-8 mb-6">Your Favorite Movies</h2>

      <FavoriteCard />
      <!-- Message if no favorites -->
      <v-alert
        v-if="favoritesStore.favorites.length === 0"
        type="info"
        class="mt-4"
      >
        No favorite movies found. Start adding some!
      </v-alert>
    </div>
  </v-container>
</template>

<script setup>
import { useFavoritesStore } from "~/store/favorites";
import { useAuthStore } from "~/store/authStore";
import LoginPrompt from "~/components/global/LoginPrompt.vue";
import FavoriteCard from "~/feature/FavoriteCard.vue";
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
</script>

<style scoped>
.v-container {
  padding: 16px;
}
</style>
