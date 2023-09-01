import { injectable } from "inversify";
import { BoardModel } from "../../domain/models";
import { BoardRepository } from "../../domain/repositories";
import { uid } from "uid";

@injectable()
export class BoardPersistence implements BoardRepository {
    create(): BoardModel {
        return new BoardModel(uid(), 0);
    }
}