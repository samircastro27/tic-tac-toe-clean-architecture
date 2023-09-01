import { BoardModel } from "../../../domain/models";

export interface AppPort {
    startNewGame(): BoardModel;
    getCurrentBoardId(): string | undefined;
    canLoadBoard(id: string): boolean;
    loadStoredBoard(id: string): BoardModel | null;
}