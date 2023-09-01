import { injectable } from "inversify";
import { BoardStatePort } from "../../../application/ports/in";
import { useBoardStore } from "../stores";
import { BoardModel } from "../../../domain/models";

@injectable()
export class BoardState implements BoardStatePort {

    private store = useBoardStore();

    setCurrentBoard(board: BoardModel): void {
        this.store.setCurrentBoard(board);
    }

    getCurrentBoard(): BoardModel {
        return this.store.board as BoardModel;
    }

    isCurrentBoardDefined(): boolean {
        return this.store.boardDefined;
    }
}