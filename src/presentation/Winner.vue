<script setup lang="ts">
import { Ref, toRefs } from 'vue';
import { Mark } from '../domain/values/tile.value';
import { useMarkColor } from '../infrastructure/composables/mark-color';

export interface WinnerProps {
    winner?: Mark;
}

const props = defineProps<WinnerProps>();
const { winner } = toRefs(props);
const { textColor } = winner?.value 
? useMarkColor(winner as Ref<Mark>) : {
  textColor: ""
};
</script>

<template>
  <section class="w-full flex justify-center">
    <p v-if="winner" class="flex flex-col items-center gap-2 w-fit text-xl font-medium text-terciary/40">
      Winner: 
      <span :class="textColor" class="text-6xl font-extrabold">{{ winner }}</span>
    </p>
    <p v-else class="w-fit text-6xl font-medium text-terciary/40">
        Tie
    </p>
  </section>
</template>
