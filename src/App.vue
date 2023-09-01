<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { dependency } from './config/project.dependencies';
import { AppPort } from './infrastructure/ports/in';

const controller = dependency<AppPort>('AppPort');
const router = useRouter();
const currentRoute = ref<string | undefined>(undefined);
const noNavRoutes = [
  "home",
  "not found"
];

const boardId = computed(() => {
  return controller?.getCurrentBoardId();
})

const showNav = computed(() => {
  return !!currentRoute.value && 
  noNavRoutes.findIndex(r => r === currentRoute.value) === -1
}
)

onMounted(() => {
  router.beforeEach(({ name }) => {
    currentRoute.value = name?.toString();
  })
})

</script>
<template>
  <main
    class="max-w-md w-full box-content md:my-2 md:border-2 border-terciary/10 rounded-lg flex flex-col mx-auto justify-start items-center bg-primary h-full overflow-hidden"
  >
    <header v-if="showNav" class="flex items-center justify-between w-full p-4 h-14 border-b-2 border-b-terciary/10 shadow-md">
      <h1 class="text-2xl font-semibold text-secondary-600">Tic tac toe</h1>
      <span v-show="boardId" class="flex items-center gap-1 text-terciary/40">
        <p>Board ID:</p>
        <span class="mr-2">#</span>
        <span class="px-2 py-1 rounded-md bg-gray-200 text-gray-500 font-mono">{{ boardId }}</span>
      </span>
    </header>
    <router-view />
  </main>
</template>
