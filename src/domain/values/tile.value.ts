export type Mark = "X" | "O" | "";
export class TileValue {
    constructor(content: Mark) {
        this.content = content;
    }
    public readonly content: Mark = "";

    public equalTo(tile: TileValue): boolean {
        if (tile == undefined) return false;
        if (tile == this) return true;
        return tile.content === this.content;
    }
}