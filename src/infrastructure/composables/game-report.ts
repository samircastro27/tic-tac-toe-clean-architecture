import { computed, ref } from "vue";
import { BoardModel } from "../../domain/models";
import { GamePort } from "../ports/in";

export function useGameReport(port: GamePort) {
    
    const board = ref<BoardModel | undefined>(port.getCurrentBoard());

    const nextMark = computed(() => {
        return port?.getCurrentMark();
    });

    const hasStepsLeft = computed(() => {
        if (!board.value || !port) return;
        return port?.stepsLeft(board.value as BoardModel) > 0;
    });

    return {
        nextMark,
        hasStepsLeft
    }
}