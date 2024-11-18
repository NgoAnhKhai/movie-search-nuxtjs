// https://nuxt.com/docs/api/configuration/nuxt-config
const MovieSearchTheme = {
  dark: true,
  colors: {
    background: "#121212", // Màu nền tối
    primary: "#BB86FC",
    secondary: "#03DAC6",
    error: "#CF6679",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@nuxt/icon", "@vueuse/nuxt", "@pinia/nuxt"],

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: "MovieSearchTheme",
        themes: {
          MovieSearchTheme,
        },
      },
      icons: {
        defaultSet: "mdi",
        sets: ["mdi", "fa"],
      },
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.TMDB_API_KEY,
    },
  },
});
