<script setup lang="ts">
import { computed, toRefs } from "vue";
import { Mark } from "../domain/values/tile.value";

export interface TileProps {
  content: Mark;
}

const props = defineProps<TileProps>();
const emit = defineEmits(["tileClick"]);
const { content } = toRefs(props);

const colorStyles = computed(() => {
  if (content.value == "") return "bg-primary border-terciary/5 hover:outline-secondary-400 focus:outline-secondary-300";
  return content.value == "O" 
  ? "bg-blue-400 text-white focus:outline-sky-300 hover:outline-sky-300" 
  : "bg-red-400 text-white border-white focus:outline-red-300 hover:outline-red-300"
});
</script>

<template>
  <article
    @click="emit('tileClick')"
    :class="colorStyles"
    class="h-full w-full flex outline-none hover:outline-offset-2 items-center justify-center font-sans font-extrabold text-6xl relative shadow-md rounded-md cursor-pointer border-2 transition-[transform,outline,outline-color] duration-100 hover:-translate-y-1 active:translate-y-[0.3rem] select-none"
    tabindex="0"
  >
    <p class="absolute">{{ content }}</p>
  </article>
</template>
