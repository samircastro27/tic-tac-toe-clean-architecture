import { BoardModel } from "../models";

export interface BoardRepository {
    create(): BoardModel
}