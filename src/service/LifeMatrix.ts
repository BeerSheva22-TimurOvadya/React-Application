import { getRandomMatrix } from '../util/random';

export default class LifeMatrix {
    constructor(private _numbers: number[][]) {}
    get numbers() {
        return this._numbers;
    }
    next(): number[][] {
        this._numbers = this._numbers.map((row, i) =>
            row.map((cell, j) => {
                const aliveNeighbours = this.countAliveNeighbours(i, j);
                if (cell === 1) {
                    return aliveNeighbours === 2 || aliveNeighbours === 3 ? 1 : 0;
                } else {
                    return aliveNeighbours === 3 ? 1 : 0;
                }
            }),
        );
        return this._numbers;
    }

    private countAliveNeighbours(i: number, j: number): number {
        const rowIndices = [i - 1, i, i + 1];
        const colIndices = [j - 1, j, j + 1];

        const neighbours = rowIndices.flatMap((ri) =>
            colIndices.map((ci) => (ri === i && ci === j ? 0 : this.getCell(ri, ci))),
        );

        return neighbours.filter(Boolean).length;
    }

    private getCell(i: number, j: number): number {
        if (i >= 0 && i < this._numbers.length && j >= 0 && j < this._numbers[0].length) {
            return this._numbers[i][j];
        }
        return 0;
    }
}
