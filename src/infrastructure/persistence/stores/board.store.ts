import { defineStore } from 'pinia';
import { BoardModel } from '../../../domain/models';

export interface BoardStoreState {
    board?: BoardModel;
}

export const useBoardStore = defineStore('board', {
    state: (): BoardStoreState => ({ board: undefined }),
    getters: {
        boardDefined: (state) => !!state.board,
    },
    actions: {
        setCurrentBoard(board: BoardModel) {
            this.board = board;
        }
    }
});