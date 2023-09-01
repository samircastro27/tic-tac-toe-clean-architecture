import { inject, injectable } from "inversify";
import { BoardModel } from "../../domain/models";
import { AppPort } from "../ports/in/app.port";
import type { BoardStatePort, StoragePort } from "../../application/ports/in";
import { TileValue } from "../../domain/values";
import { Mark } from "../../domain/values/tile.value";
import type { SetPlayingBoardUseCase, StartNewGameUseCase } from "../../application/usecases/usecase";

@injectable()
export class AppController implements AppPort {
    constructor(
        @inject('StartNewGameUseCase') private _startNewGame: StartNewGameUseCase,
        @inject('SetPlayingBoardUseCase') private setPlayingBoard: SetPlayingBoardUseCase,
        @inject('BoardStatePort') private boardState: BoardStatePort,
        @inject('StoragePort') private storage: StoragePort
    ) { };

    public startNewGame(): BoardModel {
        const board = this._startNewGame.do();
        this.setPlayingBoard.do(board);
        return board;
    }

    public getCurrentBoardId(): string | undefined {
        if (!this.boardState?.getCurrentBoard()) return undefined;
        return this.boardState.getCurrentBoard().id;
    }

    public canLoadBoard(id: string): boolean {
        return this.storage.has(`board_${id}`);
    }

    public loadStoredBoard(id: string): BoardModel | null {
        const board = this.storage.load(`board_${id}`) as string[];
        const model = new BoardModel(id, 0, board.map(t => new TileValue(t as Mark)));
        this.setPlayingBoard.do(model);
        return model;
    }
}