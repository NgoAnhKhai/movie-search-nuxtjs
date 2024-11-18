<template>
  <v-footer color="#111827" app class="footer">
    <v-container>
      <v-row justify="center" align="center">
        <v-col class="text-center">
          <p>
            Data provided by
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener"
              >The Movie Database (TMDb)</a
            >
          </p>
        </v-col>
        <v-col class="text-center">
          <p>
            Created by
            <a
              href="https://github.com/NgoAnhKhai"
              target="_blank"
              rel="noopener"
              >Ngo Anh Khai</a
            >
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  background-color: #111827;
  padding: 16px 0;
  color: #ffffff;
}
a {
  color: #90caf9;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
