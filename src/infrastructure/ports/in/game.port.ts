import { BoardModel } from "../../../domain/models";
import { Mark } from "../../../domain/values/tile.value";
import { MatchState } from "../../persistence/stores/game.store";

export interface GamePort {
    getCurrentBoard(): BoardModel;
    getCurrentMark(): Mark;
    matchStart(): void;
    matchStop(winner: Mark | undefined): void;
    markBoardAt(board: BoardModel, index: number): boolean;
    getWinner(): Mark | undefined;
    stepsLeft(board: BoardModel): number;
    hasNoStepsLeft(board: BoardModel): boolean;
    switchTurn(): Mark;
    saveBoard(board: BoardModel): boolean;
    getMatchState(): MatchState;
}