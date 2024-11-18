<template>
  <v-app id="inspire">
    <v-app-bar color="#111827" dark height="70" class="d-flex">
      <v-container class="d-flex align-center justify-center">
        <v-avatar class="me-4" color="grey-darken-1" size="50">
          <img
            src="@/assets/avatar.jpg"
            alt="User Avatar"
            class="avatar-image"
          />
        </v-avatar>
        <v-app-bar-title class="text-h4">MovieCoder</v-app-bar-title>

        <!-- OptionFeature -->
        <HomePage />
        <v-btn to="/trending">TRENDING</v-btn>
        <v-btn to="/Favorite">FAVORITE</v-btn>
        <v-btn to="/Genre">GENRE</v-btn>

        <v-spacer></v-spacer>

        <!-- SearchingFeature -->
        <v-responsive max-width="160">
          <v-text-field
            v-model="moviesStore.searchString"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="search"
            prepend-inner-icon="mdi-magnify"
            @click:append-inner="moviesStore.searchMovies"
            @keyup.enter="moviesStore.searchMovies"
          ></v-text-field>
        </v-responsive>

        <!-- Login Or Setting -->
        <template v-if="!authStore.isAuthenticated">
          <v-btn textdark @click="handleLoginClick">Log in</v-btn>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn icon dark v-bind="props">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-if="authStore.user">{{
                    authStore.user
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout">
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-container>
    </v-app-bar>
    <v-main class="bg-dark" @scroll.passive="handleScroll">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" color="surface" dark rounded="lg">
              <slot />
              <message />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <MainFooter v-if="showFooter" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HomePage from "~/feature/HomePage.vue";
import MainFooter from "./MainFooter.vue";

import { useAuthStore } from "~/store/authStore";
import { useMoviesStore } from "~/store/movies";
import { useRouter } from "nuxt/app";
import { ref, onMounted, onUnmounted } from "vue";

const authStore = useAuthStore();
const moviesStore = useMoviesStore();
const router = useRouter();

const showFooter = ref(false);

function handleScroll() {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
  showFooter.value = bottomOfWindow;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
// Hàm xử lý khi nhấn vào nút "Log in"
const handleLoginClick = () => {
  router.push("/loginPage");
};
onMounted(() => {
  authStore.initialize();
});

// Hàm đăng xuất
function logout() {
  authStore.logout();
  router.push("/");
}
</script>

<style scoped>
.v-app-bar {
  padding-top: 12px;
  padding-bottom: 12px;
}
.avatar {
  width: 50px;
  height: 50px;
}
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (min-width: 600px) {
  .avatar {
    width: 70px;
    height: 70px;
  }
}

@media (min-width: 960px) {
  .avatar {
    width: 90px;
    height: 90px;
  }
}

@media (min-width: 1280px) {
  .avatar {
    width: 120px;
    height: 120px;
  }
}
</style>
