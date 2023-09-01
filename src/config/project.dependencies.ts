import { globalContainer } from "./inversify.config";
import { Container } from "inversify";
import { GetCurrentBoard, SaveBoard, SetPlayingBoard, StartNewGame } from "../application/usecases";
import { AppController, GameController } from "../infrastructure/controllers";
import { BoardPersistence, LocalStoragePersistence } from "../infrastructure/persistence";
import { BoardState, GameState } from "../infrastructure/persistence/states";

type Constructor = new (...args: any[]) => any;

function dependOn<T extends Constructor>(objectName: string, target: T, container: Container = globalContainer) {
    const token = objectName;
    return container.bind(token).to(target);
}

export const buildDependencies = () => {
    dependOn('AppPort',AppController);
    dependOn('GamePort',GameController);
    dependOn('StartNewGameUseCase', StartNewGame);
    dependOn('SetPlayingBoardUseCase', SetPlayingBoard);
    dependOn('GetCurrentBoardUseCase', GetCurrentBoard);
    dependOn('SaveBoardUseCase', SaveBoard);
    dependOn('BoardRepository', BoardPersistence);
    dependOn('BoardStatePort', BoardState);
    dependOn('GameStatePort', GameState);
    dependOn('StoragePort', LocalStoragePersistence)
}

export const dependency = <T>(
    token: string, container: Container = globalContainer
): T | undefined => {
    return container.get(token);
}