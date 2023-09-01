import { BoardModel } from "../../../domain/models";

export interface BoardStatePort {
    setCurrentBoard(board: BoardModel): void;
    getCurrentBoard(): BoardModel;
    isCurrentBoardDefined(): boolean;
}