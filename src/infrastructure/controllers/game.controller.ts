import { inject, injectable } from "inversify";
import { GamePort } from "../ports/in";
import { BoardModel } from "../../domain/models";
import type { GetCurrentBoardUseCase, SaveBoardUseCase } from "../../application/usecases/usecase";
import type { GameStatePort } from "../../application/ports/in";
import { Mark } from "../../domain/values/tile.value";
import { MatchState } from "../persistence/stores/game.store";

@injectable()
export class GameController implements GamePort {
    constructor(
        @inject('GetCurrentBoardUseCase') private _getCurrentBoard: GetCurrentBoardUseCase,
        @inject('GameStatePort') private gameState: GameStatePort,
        @inject('SaveBoardUseCase') private _saveBoard: SaveBoardUseCase,
    ) { }
    getCurrentBoard(): BoardModel {
        return this._getCurrentBoard.do();
    }

    getCurrentMark(): Mark {
        return this.gameState.getCurrentMark();
    }

    switchTurn(): Mark {
        return this.gameState.switchTurn();
    }

    matchStart(): void {
        this.gameState.matchStart();
    }

    matchStop(winner: Mark | undefined): void {
        this.gameState.matchStop(winner);
    }

    getWinner(): Mark | undefined {
        return this.gameState.getWinner();
    }

    stepsLeft(board: BoardModel) {
        return board.getStepsLeft();
    }

    markBoardAt(board: BoardModel, index: number): boolean {
        const mark = this.getCurrentMark();
        if (!mark || !board) return false;
        return this.markBoard(board, index, mark);
    }

    hasNoStepsLeft(board: BoardModel): boolean {
        const stepsLeft = board.getStepsLeft() ?? 9;
        return stepsLeft <= 0;
    }

    saveBoard(board: BoardModel): boolean {
        this._saveBoard.do(board);
        return true;
    }

    public getMatchState(): MatchState {
        return this.gameState.getMatchState();
    }

    private markBoard(board: BoardModel, index: number, mark: Mark): boolean {
        return board.mark(index, mark);
    }
}