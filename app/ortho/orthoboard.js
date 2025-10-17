/* orthoboard.js

Defines board mechanics for an orthogonal board.
Adjacency is vertical, horizontal and diagonal in 2 dimensions.

*/

import { Board, Cell } from "../base/board.js"

export class OrthoBoard extends Board {
    constructor(virusCount, columns, rows) {
        super(); // Board.constructor() is empty but must be called.

        // Static information. Will not change after this initialization.
        this.configuration = {
            virusCount: virusCount,
            columns: columns,
            rows: rows,
        };

        // Main board of cells as 2d array.       
        this.cells = Array.from({ length: this.configuration.columns }, () =>
            Array.from({ length: this.configuration.rows }, () => new Cell())
        );


        // Distribute all viruses randomly.
        let remaining = this.configuration.virusCount;
        while (remaining > 0) {
            const col = Math.floor(Math.random() * this.configuration.columns);
            const row = Math.floor(Math.random() * this.configuration.columns);
            const cell = this.cells[col][row];
            if (!cell.isInfected) {
                cell.isInfected = true;
                remaining--;
            }
        }

        // Update each cell's risk level based on adjacent viruses.
        for (let col = 0; col < this.configuration.columns; col++) {
            for (let row = 0; row < this.configuration.rows; row++) {
                const adjacentPositions = this.getAdjacentCellPositions({col, row});
                const risk = adjacentPositions
                    .filter(({ col, row }) => this.cells[col][row].isInfected)
                    .length;
                this.cells[col][row].riskLevel = risk; 
            }
        }

        // Start the board
        this.isActive = true;
    }

    // Access cells by their position on the board.
    // The methods are meant for use by other classes.
    // OrthoBoard directly access the array for simplicity. 
    getCell(pos) { return this.cells[pos.col][pos.row]}
    setCell(pos, cell) { this.cells[pos.col][pos.row] = cell }

    getStatus() {
        // The board is complete if each cell is either analyzed or contained
        // The board is won if all infected cells are contained. A board can be won without being complete.
        // The board is switched inactive if it is won or lost.
        const isWon = this.cells.flat().every(cell => cell.isInfected ? cell.isContained : true);
        const isLost = this.cells.flat().some(cell => cell.isInfected && cell.isAnalyzed)
        if (isWon || isLost) this.isActive = false;
        return {
            analyzedCells: this.cells.flat().filter(cell => cell.isAnalyzed).length,
            containedCells: this.cells.flat().filter(cell => cell.isContained).length,
            isComplete: this.cells.flat().every(cell => cell.isAnalyzed || cell.isContained),
            isLost: isLost,
            isWon: isWon,
            isActive: this.isActive,
        };
    }

    // For any given position, returns an array with adjacent cell positions.
    // Positions on the board's edge have less than eight adjacent cells.
    // This would be modified for a hex grid.
    getAdjacentCellPositions(pos) {
        const col = Number(pos.col);
        const row = Number(pos.row);
        const minCol = 0;
        const minRow = 0;
        const maxCol = this.configuration.columns - 1;
        const maxRow = this.configuration.rows - 1;

        const up =    row <= minRow ? undefined : row-1;
        const right = col >= maxCol ? undefined : col+1;
        const down  = row >= maxRow ? undefined : row+1;
        const left  = col <= minCol ? undefined : col-1;

        return [
            {col: col,   row: up},
            {col: right, row: up},
            {col: right, row: row},
            {col: right, row: down},
            {col: col,   row: down},
            {col: left,  row: down},
            {col: left,  row: row},
            {col: left,  row: up},
        ].filter(pos => {return pos.col !== undefined && pos.row !== undefined})
    }

    // Returns a simplified representation of the board for the UI layer.
    // This is the main contract between model and view.
    // Any chance to this format MUST be mirrored in View.render()
    getUserView() {
        const status = this.getStatus();
        const cells = this.cells.map((col, colIdx) => {
            return col.map((cell, rowIdx) => {
                if (cell.isContained) return 'contained';
                if (cell.isInfected && !this.isActive) return 'infected';
                if (cell.isAnalyzed) return cell.riskLevel;    
                return 'unknown';
            });
        })
        return {
            virusCount: this.configuration.virusCount,
            columns: this.configuration.columns,
            rows: this.configuration.rows,
            analyzedCells: status.analyzedCells,
            containedCells: status.containedCells,
            isComplete: status.isComplete,
            isWon: status.isWon,
            isActive: status.isActive,
            cells: cells,
        };
    }
}