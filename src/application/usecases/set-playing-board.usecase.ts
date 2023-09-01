import { inject, injectable } from "inversify";
import { BoardModel } from "../../domain/models";
import { SetPlayingBoardUseCase } from "./usecase";
import type { BoardStatePort } from "../ports/in";

@injectable()
export class SetPlayingBoard implements SetPlayingBoardUseCase {
    constructor(
        @inject('BoardStatePort') private boardState: BoardStatePort
    ) { };

    public do(board: BoardModel) {
        this.boardState.setCurrentBoard(board);
    }
}