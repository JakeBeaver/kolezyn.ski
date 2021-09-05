function copy(A: number[][]): number[][] {
    return A.map(x => x.map(y => y));
}

interface Transformation {
    get M(): number[][];
}

export class Rx implements Transformation {
    private _M: number[][];
    public get M(): number[][] { return copy(this._M); }
    constructor(a: number) {
        let c = Math.cos(a), s = Math.sin(a);
        this._M = [
            [1, 0, 0, 0],
            [0, c, -s, 0],
            [0, s, c, 0],
            [0, 0, 0, 1]
        ];
    }
}

export class Ry implements Transformation {
    private _M: number[][];
    public get M(): number[][] { return copy(this._M); }
    constructor(a: number) {
        let c = Math.cos(a), s = Math.sin(a);
        this._M = [
            [c, 0, s, 0],
            [0, 1, 0, 0],
            [-s, 0, c, 0],
            [0, 0, 0, 1]
        ];
    }
}
export class Rz implements Transformation {
    private _M: number[][];
    public get M(): number[][] { return copy(this._M); }
    constructor(a: number) {
        let c = Math.cos(a), s = Math.sin(a);
        this._M = [
            [c, -s, 0, 0],
            [s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }
}

export class T implements Transformation {
    private _M: number[][];
    public get M(): number[][] { return copy(this._M); }
    constructor(p: Position) {
        this._M = [
            [1, 0, 0, p.x],
            [0, 1, 0, p.y],
            [0, 0, 1, p.z],
            [0, 0, 0, 1]
        ];
    }
}

function element(A: number[][], B: number[][], x: number, y: number) {
    let output = 0;
    for (let i = 0; i < 4; i++) {
        output += A[x][i] * B[i][y];
    }
    return output;
}

function mult(A: number[][], B: number[][]) {
    let output: number[][] = []
    for (let x = 0; x < 4; x++) {
        output.push([]);
        for (let y = 0; y < 4; y++) {
            output[x].push(element(A, B, x, y));
        }
    }
    return output;
}

export class Position {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly z: number
    ) { }
    static fromPolar(r: number, zToPlane: number, xToY: number) {
        return new Position(
            r * Math.cos(zToPlane) * Math.sin(xToY),
            r * Math.cos(zToPlane) * Math.cos(xToY),
            r * Math.sin(zToPlane)
        );
    }
    static fromM(M: number[][]) {
        return new Position(M[0][3], M[1][3], M[2][3]);
    }
}

export function chainTransforms(...transformations: Transformation[]): Position {
    if (!transformations || !transformations.length) {
        return new Position(0, 0, 0);
    }
    let output = transformations[0].M;
    for (let B of transformations.slice(1)) {
        output = mult(output, B.M);
    }
    return Position.fromM(output);
}