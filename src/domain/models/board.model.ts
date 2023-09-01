import { TileValue } from "../values";
import { Mark } from "../values/tile.value";

export class BoardModel {
    constructor(id: string, moveCount: number, tiles?: TileValue[]) {
        this.id = id;
        this.moveCount = moveCount;
        this.setUpTiles(tiles);
    }
    public readonly id: string;
    public moveCount: number;
    public tiles!: TileValue[];

    public mark(tile: number, mark: Mark): boolean {
        if (!this.validTileNumber(tile)) throw new Error("Invalid tile number");
        if (!this.canMarkTile(tile)) return false;
        this.tiles[tile] = new TileValue(mark);
        this.moveCount++;
        return true;
    }

    public getStepsLeft() {
        return 9 - this.moveCount;
    }

    public evaluateWinner(): Mark | undefined {
        const rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const winner = rows.find(([a, b, c]) => {
            return this.tiles[a].content != ""
                && this.tiles[a].equalTo(this.tiles[b])
                && this.tiles[b].equalTo(this.tiles[c]);
        });
        return winner
            ? this.tiles[winner[0]].content
            : undefined;
    }

    private validTileNumber(tile: number): boolean {
        if (this.tiles.length == 0) return false;
        return tile >= 0 && tile < this.tiles.length;
    }

    private setUpTiles(tiles?: TileValue[]): this {
        this.tiles = tiles
            ? tiles
            : Array<TileValue>(9).fill(new TileValue(""));
        return this;
    }

    private canMarkTile(index: number): boolean {
        return this.tiles[index].content == "";
    }

}