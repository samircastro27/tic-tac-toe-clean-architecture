<script setup lang="ts">
import Button from "../ui/Button.vue";
import Title from "../ui/Title.vue";
import Input from "../ui/Input.vue";
import { computed, ref } from "vue";
import { dependency } from "../../config/project.dependencies";
import { useRouter } from "vue-router";
import { AppPort } from "../../infrastructure/ports/in";

const controller = dependency<AppPort>("AppPort");

const boardId = ref<string | undefined>(undefined);
const boardIdToLoad = ref<string | undefined>(undefined);
const errorMessage = ref<string | undefined>(undefined);

const router = useRouter();

const allowLoad = computed(() => {
  return !!boardIdToLoad.value;
})

function startGame() {
  boardId.value = controller?.startNewGame().id;
  router.push({ name: "game", query: { boardId: boardId.value } });
}

function continueGame() {
  if(!boardIdToLoad.value) return;
  if(!controller?.canLoadBoard(boardIdToLoad.value)) {
    errorMessage.value = `The board ID #${boardIdToLoad.value} was not found.`;
    return;
  }
  controller.loadStoredBoard(boardIdToLoad.value);
  router.push({ name: "game" });
}
</script>
<template>
  <Title label="Tic tac toe" />
  <span class="mt-4 h-6">
    <p v-if="boardId" class="text-terciary/40">Playing board: #{{ boardId }}</p>
    <p class="text-red-600">{{ errorMessage }}</p>
  </span>
  <section class="flex flex-col flex-1 w-full gap-4 px-12 mt-[20rem]">
    <Button @buttonClick="startGame()" label="start game" />
    <Input v-model="boardIdToLoad" placeholder="Paste your board ID number" />
    <Button
      :disabled="!allowLoad"
      @buttonClick="continueGame()"
      label="continue"
      buttonStyle="secondary"
    />
  </section>
  <footer class="h-auto p-8">
    <p>Copyright &copy; John James Valencia</p>
  </footer>
</template>
