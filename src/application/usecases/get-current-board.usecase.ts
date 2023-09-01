import { inject, injectable } from "inversify";
import { BoardModel } from "../../domain/models";
import { GetCurrentBoardUseCase } from "./usecase";
import type { BoardStatePort } from "../ports/in";

@injectable()
export class GetCurrentBoard implements GetCurrentBoardUseCase {
    constructor(
        @inject('BoardStatePort') private boardState: BoardStatePort
    ) { }
    public do(): BoardModel {
        return this.boardState.getCurrentBoard();
    }
}