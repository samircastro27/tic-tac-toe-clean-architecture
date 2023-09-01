import { Mark } from "../../../domain/values/tile.value";
import { MatchState } from "../../../infrastructure/persistence/stores/game.store";

export interface GameStatePort {
    getCurrentMark(): Mark;
    getStartTime(): number;
    getEndTime(): number;
    matchStart(): void;
    matchStop(winner: Mark | undefined): void;
    switchTurn(): Mark;
    getWinner(): Mark | undefined;
    getMatchState(): MatchState;
}