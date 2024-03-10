"use strict";
const moves = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
};
function canMoveTo(grid, r, c) {
    return (r >= 0 &&
        r < grid.length &&
        c >= 0 &&
        c < grid[r].length &&
        grid[r][c] !== " " &&
        grid[r][c] !== "s");
}
function followPath(grid) {
    let startCol = grid[0].indexOf(">");
    if (startCol === -1) {
        return [null, null];
    }
    let path = "@";
    let letters = "";
    let direction = "right";
    let row = 0, col = startCol;
    while (true) {
        let [rowMove, colMove] = moves[direction];
        let nextRow = row + rowMove;
        let nextCol = col + colMove;
        if (!(nextRow >= 0 &&
            nextRow < grid.length &&
            nextCol >= 0 &&
            nextCol < grid[nextRow].length)) {
            break;
        }
        let currentCell = grid[nextRow][nextCol];
        if (currentCell >= "A" && currentCell <= "Z") {
            letters += currentCell;
        }
        path += currentCell;
        row = nextRow;
        col = nextCol;
        if (currentCell === "s") {
            break;
        }
        if (currentCell === "+" || (currentCell >= "A" && currentCell <= "Z")) {
            let possibleDirections = ["up", "down", "left", "right"].filter((d) => d !== direction);
            for (let newDirection of possibleDirections) {
                let [rMove, cMove] = moves[newDirection];
                let newRow = row + rMove;
                let newCol = col + cMove;
                if (canMoveTo(grid, newRow, newCol) &&
                    (newRow !== row - rowMove || newCol !== col - colMove)) {
                    direction = newDirection;
                    break;
                }
            }
        }
    }
    return [path, letters];
}
// Testing
const grid = [
    ">---A-@-+",
    "        |",
    "+-U-+   C",
    "|   |   |",
    "s   C---+"
];
const [path, letters] = followPath(grid);
console.log("Path:", path);
console.log("Letters:", letters);
const grid2 = [
    ">---A---+",
    "        |",
    "s-B-+   C",
    "    |   |",
    "    +---+"
];
const [path2, letters2] = followPath(grid2);
console.log("Path:", path2);
console.log("Letters:", letters2);
