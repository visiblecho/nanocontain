/* orthogame.js

Extends Model and implements the main user actions (analyze, contain, reset)
Uses OrthoBoard to handle board logic

*/


import { Model } from "../base/mvc.js"
import { OrthoBoard } from "./orthoboard.js"
import { OrthoView } from "./orthoview.js";

export class OrthoGame extends Model { 
    constructor(virusCount, columns, rows) {
        super();
        
        this.counters = {
            infected: virusCount,
            analyzed: 0,
            contained: 0,
        }

        // Set up the board
        this.board = new OrthoBoard(virusCount, columns, rows);

        // Expose the actions to the UI layer
        this.actions = {
            analyze: data => this.analyze(data),
            contain: data => this.contain(data),
        }
    }

    analyze(data) {
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);
        
        // Only if the cell is not analyzed yet (vital to end the recursion)
        if (!cell.isAnalyzed) {
            // Update the cell
            cell.isAnalyzed = true;
            this.board.setCell(pos, cell);
            this.counters.analyzed++;

            // Flood fill
            if (cell.riskLevel === 0) {
                const adjacentPositions = this.board.getAdjacentCellPositions(pos)
                adjacentPositions.forEach(cell => {
                    this.analyze({column: cell.col, row: cell.row})
                })
            }
        }

        // Store the current state, and notify observers to retrieve it.
        this.updateState(this.board.getUserView())
        this.notifyObservers();
    }

    contain(data) {
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);
        if (!cell.isAnalyzed) {
            if (cell.isContained) {
                cell.isContained = false
                this.counters.contained--;
            } else if (this.counters.contained < this.counters.infected) {
                cell.isContained = true;
                this.counters.contained++;
            }
        }
        this.board.setCell(pos, cell);
        

        // Store the current state, and notify observers to retrieve it.
        this.updateState(this.board.getUserView())
        this.notifyObservers();
    }
}