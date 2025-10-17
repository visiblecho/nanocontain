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

        // Set up the board
        this.board = new OrthoBoard(virusCount, columns, rows);

        // Create counters for analyzed and contained cells, caching these values.
        // TODO Refactor and remove the cache. Instead, get values from this.board.getStatus()
        this.counters = {
            infected: virusCount,
            analyzed: 0,
            contained: 0,
        }

        // Expose the actions to the view layer.
        // (See Model, View, Controller classes for more explanation.)
        this.actions = {
            analyze: data => this.analyze(data),
            contain: data => this.contain(data),
        }

        // Store the initial state.
        this.updateState(this.board.getUserView())
    }

    // Main user action: Analyze a cell whether it is infected.
    // If it is not close to an infected cell, analyze adjacent ones automatically.
    analyze(data) {
        // Cache the values for position and cell state.
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);
        
        // Only if the cell is not analyzed yet (vital to end the recursion)
        if (!cell.isAnalyzed) {
            // Update the cell
            cell.isAnalyzed = true;
            this.board.setCell(pos, cell);
            this.counters.analyzed++;

            // Recursively analyze all adjacent positions (flood fill)
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

    // Main user action: Toggle containment of a cell that is likely infected.
    contain(data) {
        // Cache the values for position and cell state.
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);

        // Works only on unknown cells
        if (!cell.isAnalyzed) {
            if (cell.isContained) {
                // toggle false
                cell.isContained = false
                this.counters.contained--;
            } else if (this.counters.contained < this.counters.infected) {
                // toggle true only if the max. number of contained cells is not reached
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