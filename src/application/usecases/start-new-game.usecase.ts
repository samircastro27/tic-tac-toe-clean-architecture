import { inject, injectable } from "inversify";
import { StartNewGameUseCase } from "./usecase";
import type { BoardRepository } from "../../domain/repositories";

@injectable()
export class StartNewGame implements StartNewGameUseCase {
    constructor(
        @inject('BoardRepository') private repository: BoardRepository
    ) {}
    public do() {
        return this.repository.create();
    }
}