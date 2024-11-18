import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", () => {
  const showMessage: Ref<boolean> = ref(false);
  const message: Ref<string> = ref("");
  return { showMessage, message };
});
