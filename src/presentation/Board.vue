<script setup lang="ts">
import { toRefs } from "vue";
import { BoardModel } from "../domain/models";
import Tile from "./Tile.vue";

export interface BoardProps {
  board: BoardModel;
}
const props = defineProps<BoardProps>();
const emit = defineEmits(["tile-click"]);
const { board } = toRefs(props);

function onTileClick(index: number) {
  emit("tile-click", index);
}
</script>

<template>
  <section class="grid grid-cols-3 gap-2 w-[20rem] h-[20rem] mx-auto">
    <Tile
      v-for="(tile, index) in board.tiles"
      :key="index"
      @tile-click="onTileClick(index)"
      :content="tile.content"
    />
  </section>
</template>
