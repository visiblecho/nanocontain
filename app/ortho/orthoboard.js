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
        this.cells = [];
        for (let col = 0; col < this.configuration.columns; col++) {
            let arr = [];
            for (let row = 0; row < this.configuration.rows; row++) {
                arr.push(new Cell());
            }
            this.cells.push(arr);
        }

        // Distribute all viruses randomly.
        let undistributedViruses = this.configuration.virusCount;
        while (undistributedViruses > 0) {
            const col = Math.floor(Math.random() * this.configuration.columns);
            const row = Math.floor(Math.random() * this.configuration.columns);
            if (this.cells[col][row].isInfected === false) {
                this.cells[col][row].isInfected = true;
                undistributedViruses--;
            }
        }

        // Update each cell's risk level based on adjacent viruses.
        for (let col = 0; col < this.configuration.columns; col++) {
            for (let row = 0; row < this.configuration.rows; row++) {
                const adjacentPositions = this.getAdjacentCellPositions({col: col, row: row});
                const risk = adjacentPositions
                    .map(pos => { return this.cells[pos.col][pos.row].isInfected ? 1 : 0 })
                    .reduce((a, b) => { return a + b }, 0);
                this.cells[col][row].riskLevel = risk; 
            }
        }

        // Start the board
        this.isActive = true;
    }

    // Access cells by their position on the board.
    // The methods are meant for use by other classes.
    // Methods of OrthoBoard directly access the array for simplicity. 
    getCell(pos) { return this.cells[pos.col][pos.row]}
    setCell(pos, cell) { this.cells[pos.col][pos.row] = cell }

    getStatus() {
        // The board is complete if each cell is either analyzed or contained
        // The board is won if all infected cells are contained. A board can be won without being complete.
        // The board is switched inactive if it is won and active.
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
            {col: col, row: up},
            {col: right, row: up},
            {col: right, row: row},
            {col: right, row: down},
            {col: col, row: down},
            {col: left, row: down},
            {col: left, row: row},
            {col: left, row: up},
        ].filter(pos => {return pos.col !== undefined && pos.row !== undefined}) // remove all undefined positions
    }

    getUserView() {
        const status = this.getStatus();
        const cells = this.cells.map((col, colIdx) => {
            return col.map((cell, rowIdx) => {
                if (cell.isInfected && !this.isActive) return 'infected';
                if (cell.isContained) return 'contained';
                if (cell.isAnalyzed) return cell.riskLevel;    
                return 'unknown';
            });
        })
        const view = {
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
        return view;
    }
}