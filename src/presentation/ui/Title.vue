<script setup lang="ts">
import { toRefs } from 'vue';

export interface TitleProps {
    label: string;
}

const props = defineProps<TitleProps>();
const { label } = toRefs(props);

</script>
<template>
  <h1 class="font-bold text-6xl mt-[10rem] text-center text-secondary-600">
    {{ label }}
  </h1>
</template>