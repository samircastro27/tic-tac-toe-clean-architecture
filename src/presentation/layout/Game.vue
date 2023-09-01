<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../ui/Button.vue";
import Board from "../Board.vue";
import Timer from "../Timer.vue";
import Winner from "../Winner.vue";
import CurrentTurn from "../CurrentTurn.vue";
import { useGameReport } from "../../infrastructure/composables/game-report";
import { dependency } from "../../config/project.dependencies";
import { BoardModel } from "../../domain/models";
import { GamePort } from "../../infrastructure/ports/in";
import { Mark } from "../../domain/values/tile.value";

const controller = dependency<GamePort>("GamePort");
if (!controller)
  throw new Error("Cannot instanciate GameController on Game.vue");

const board = ref<BoardModel | undefined>(undefined);
const timer = ref<InstanceType<typeof Timer> | null>(null);
const winner = ref<Mark | undefined>(undefined);

const router = useRouter();
const { nextMark, hasStepsLeft } = useGameReport(controller);

onBeforeMount(() => {
  board.value = controller?.getCurrentBoard();
  if (!board.value) router.push({ name: "home" });
});

onMounted(() => {
  controller?.matchStart();
});

function onTileClick(index: number) {
  if(controller?.getMatchState() == "finished") return;
  
  const boardMarked = controller?.markBoardAt(board.value as BoardModel, index);
  if (!boardMarked) return;
  if (!timer.value?.hasStarted) timer.value?.start();

  const winnerMark = board.value?.evaluateWinner();

  const hasWinner = winnerMark != undefined;
  const hasNoStepsLeft =
    controller?.hasNoStepsLeft(board.value as BoardModel) ?? false;
  const cannotContinue = hasWinner || hasNoStepsLeft;
  if (cannotContinue) {
    if(hasWinner) controller?.matchStop(winnerMark);
    else controller?.matchStop(undefined);

    winner.value = winnerMark;

    timer.value?.stop();
    return;
  }

  controller?.switchTurn();
}

async function quitGame() {
  if(board.value?.id) {
    controller?.saveBoard(board.value as BoardModel);
    await navigator.clipboard.writeText(board.value.id);
  }
  router.push("/home");
}
</script>
<template>
  <main class="flex flex-col w-full h-full">
    <header class="p-12">
      <section class="mb-6">
        <span class="flex justify-center">
          <p class="text-terciary/40">Timer</p>
        </span>
        <Timer ref="timer" />
      </section>
      <CurrentTurn
        v-if="hasStepsLeft && !winner && nextMark"
        :mark="nextMark"
      />
      <Winner v-else :winner="winner" />
    </header>
    <section class="flex-1 mt-14">
      <Board
        v-if="board"
        :board="(board as BoardModel)"
        @tile-click="onTileClick($event)"
      />
    </section>
    <footer class="flex flex-col mb-24 px-12 w-full">
      <Button label="quit" @button-click="quitGame" />
    </footer>
  </main>
</template>
