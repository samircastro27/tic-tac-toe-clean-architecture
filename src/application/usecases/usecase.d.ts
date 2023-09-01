import { BoardModel } from "../../domain/models";

export interface UseCase {
    do(...args: any[]): any;
}

export interface StartNewGameUseCase extends UseCase { 
    do(): BoardModel;
}
export interface SetPlayingBoardUseCase extends UseCase {
    do(board: BoardModel): void;
 }
export interface GetCurrentBoardUseCase extends UseCase {
    do(): BoardModel;
}
export interface SaveBoardUseCase extends UseCase {
    do(board: BoardModel): boolean;
}