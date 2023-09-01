import { defineStore } from "pinia";
import { Mark } from "../../../domain/values/tile.value";

export type MatchState = "pending" | "started" | "finished";
export interface GameStoreState {
    currentMark: Mark;
    state: MatchState;
    startTime?: number;
    endTime?: number;
    winner?: Mark;
}

export const useGameStore = defineStore('game', {
    state: (): GameStoreState => ({
        currentMark: "",
        state: "pending",
    }),
    actions: {
        matchStart() {
            this.state = "started";
            this.startTime = Date.now();
            this.currentMark = Math.random() > 0.5 ? "X" : "O";
        },
        matchStop(winner: Mark | undefined) {
            if(this.state != "started") throw new Error("Illegal match state");
            if(winner == "") throw new Error("Illegal winner");
            this.state = "finished";
            this.endTime = Date.now();
            this.winner = winner;
        },
        switchTurn() {
            this.currentMark = this.currentMark == "X"
            ? "O"
            : "X";
            return this.currentMark;
        }
    }
});