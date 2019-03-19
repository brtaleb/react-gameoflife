const getFromMatrix = m => ([x, y]) => (m[y] || [])[x];

const neighborDirs = [
    [ -1, -1 ], [  0, -1 ], [ 1, -1 ],
    [ -1,  0 ],             [ 1,  0 ],
    [ -1,  1 ], [  0,  1 ], [ 1,  1 ]
];

const getNeighbors = (x, y, n, m) => n
    .map(([dX, dY]) => [ x + dX, y + dY ])
    .map(getFromMatrix(m))
    .filter(v => v !== undefined);

export const getNeighborsCount = (y,x,board) => {
    let count = 0;
    getNeighbors(x, y, neighborDirs, board).forEach(el => {
        if (el) count++;
    })
    return count;
}
