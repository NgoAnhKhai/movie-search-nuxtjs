<!-- feature/Option.vue -->
<template>
  <div class="options">
    <v-btn text="Home Page" variant="text" dark @click="goToHomePage">
      Home Page
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMoviesStore } from "~/store/movies";

const router = useRouter();
const moviesStore = useMoviesStore();

function goToHomePage() {
  // Đặt lại trạng thái tìm kiếm về mặc định
  moviesStore.searchString = "";
  moviesStore.page = 1;
  moviesStore.featureMovies();

  // Điều hướng về trang chủ
  router.push("/");
}
</script>

<style scoped>
.options {
  display: flex;
  gap: 16px;
}
</style>
