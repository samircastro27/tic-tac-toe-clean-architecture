<script setup lang="ts">
import { computed } from "vue";
import { useTimer } from "../infrastructure/composables";

const timer = useTimer(50);

const timeFormat = computed(() => {
  const { millis, minutes, seconds } = timer.formatted.value;
  return `${minutes}:${seconds}.${millis}`;
});

const start = () => {
  timer.start();
};

const stop = () => {
  timer.stop();
};

defineExpose({
  start,
  stop,
  hasStarted: timer.hasStarted,
  hasFinished: timer.finished,
});
</script>
<template>
  <span class="flex justify-center w-full text-5xl text-secondary-700/40 font-light">
    <p>
      {{ timeFormat }}
    </p>
  </span>
</template>
