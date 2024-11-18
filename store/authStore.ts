// store/authStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: ref(null),
    isAuthenticated: ref(false),
  }),
  actions: {
    login(user: any) {
      this.user = user;
      this.isAuthenticated = true;
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("user");
      }
    },
    initialize() {
      if (typeof window !== "undefined") {
        const userSession = window.sessionStorage.getItem("user");
        if (userSession) {
          this.user = JSON.parse(userSession);
          this.isAuthenticated = true;
        }
      }
    },
  },
});
