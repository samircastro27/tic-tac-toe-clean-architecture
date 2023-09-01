<script setup lang="ts">
import { toRefs } from 'vue';
import { Mark } from '../domain/values/tile.value';
import { useMarkColor } from '../infrastructure/composables/mark-color';

export interface CurrentTurnProps {
    mark: Mark;
}
const props = defineProps<CurrentTurnProps>();
const { mark } = toRefs(props);

const { textColor } = useMarkColor(mark);
</script>
<template>
  <section
    class="flex items-center justify-between p-6 bg-white shadow-md rounded-md border border-terciary/5"
  >
    <span class="text-xl font-semibold text-terciary/30">Current turn: </span>
    <span 
    class="font-extrabold text-2xl"
    :class="textColor">{{ mark }}</span>
  </section>
</template>
