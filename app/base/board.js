/* board.js

Defines board and cell interfaces without functionality

*/

export class Cell {
    constructor() {
        this.isInfected = false;
        this.isContained = false;
        this.isAnalyzed = false;
        this.riskLevel = undefined;
    }
}

export class Board {
    // Returns a cell from a given position
    getCell(pos)  {throw new Error('Method must be overriden')}

    // Sets a cell to a given position
    setCell(pos, cell)  {throw new Error('Method must be overriden')}

    // Checks if the board is complete and won and returns the result
    getStatus() {throw new Error('Method must be overriden')}

    // Returns an array of positions that are adjacent to the given position
    getAdjacentCellPositions(pos) {throw new Error('Method must be overriden')}

   
    // Returns the boards current state as seen by the user (i.e. no internals)
    getUserView() {throw new Error('Method must be overriden')}
}


