<template>
  <v-dialog v-model="messageStore.showMessage" width="404">
    <v-card>
      <v-card-text>
        <P>{{ messageStore.message }}</P>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useMessageStore } from "~/store/message";

const messageStore = useMessageStore();
</script>
