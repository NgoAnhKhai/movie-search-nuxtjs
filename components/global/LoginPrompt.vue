<!-- components/LoginPrompt.vue -->
<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>
        <p>{{ message }}</p>
        <v-btn class="custom-login-btn" @click="redirectToLogin">Log In</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Props for customization
const props = defineProps({
  title: {
    type: String,
    default: "Access Denied",
  },
  message: {
    type: String,
    default: "You need to log in to access this feature.",
  },
});

const show = ref(true); // Controls the visibility of the dialog
const router = useRouter();

// Method to redirect to the login page
function redirectToLogin() {
  router.push("/loginPage");
}
</script>

<style scoped>
.v-dialog {
  text-align: center;
}
.custom-login-btn {
  background-color: #e63946;
  color: white;
  font-weight: bold;
}

.custom-login-btn:hover {
  background-color: #d62839;
}
</style>
