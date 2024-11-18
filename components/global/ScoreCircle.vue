<!-- components/global/ScoreCircle.vue -->
<template>
  <div class="circle">
    <v-progress-circular
      :model-value="score * 10"
      :color="color"
      size="44"
      width="5"
      :bg-color="bgColor"
    >
      <p class="text-black font-weight-bold">{{ score?.toFixed(1) }}</p>
    </v-progress-circular>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
});

const color = computed(() => {
  if (props.score <= 4) return "red";
  if (props.score > 4 && props.score < 7) return "orange";
  return "green";
});
const bgColor = computed(() => {
  if (props.score <= 4) return "red-lighten-4";
  if (props.score > 4 && props.score < 7) return "yellow-lighten-4";
  return "green-lighten-4";
});
</script>

<style scoped>
.circle {
  width: 48px;
  height: 48px;
  background-color: white;
  position: absolute;
  bottom: 80px;
  left: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
