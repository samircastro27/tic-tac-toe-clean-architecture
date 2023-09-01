import { injectable, inject } from "inversify";
import { SaveBoardUseCase } from "./usecase";
import type { StoragePort } from "../ports/in";
import { BoardModel } from "../../domain/models";

@injectable()
export class SaveBoard implements SaveBoardUseCase {
    constructor(
        @inject('StoragePort') private storage: StoragePort,
    ) {}
    do(board: BoardModel): boolean {
        const tiles = board.tiles.map(t => t.content);
        this.storage.save(`board_${board.id}`, tiles);
        return true;
    }
}