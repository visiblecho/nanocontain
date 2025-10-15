/* orthogame.js

Extends Model and implements the main user actions (analyze, contain, reset)
Uses OrthoBoard to handle board logic

*/


import { Model } from "../base/mvc.js"
import { OrthoBoard } from "./orthoboard.js"
import { OrthoView } from "./orthoview.js";

export class OrthoGame extends Model { 
    constructor(virusCount, sizeX, sizeY) {
        console.debug('OrthoGame.constructor');
        super();
        
        // Expose the actions to the UI layer
        this.actions = {
            analyze: data => this.analyze(data),
            contain: data => this.contain(data),
            reset: data => this.reset(data),
        }

        // Set up the board
        this.board = null;
        this.actions.reset({
            virusCount: virusCount,
            sizeX: sizeX,
            sizeY: sizeY,
        })
    }

    analyze(data) {
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);
        cell.isAnalyzed = true;
        this.board.setCell(pos, cell);

        /* something with recursion */

        this.updateState(this.board.getUserView())
        this.notifyObservers();
    }

    contain(data) {
        const pos = {col: data.column, row: data.row};
        const cell = this.board.getCell(pos);
        if (!cell.isAnalyzed) cell.isContained = !cell.isContained;
        this.board.setCell(pos, cell);

        this.updateState(this.board.getUserView())
        this.notifyObservers();
    }

    // TODO: Remove. This is not part of the game, but manages the game */
    reset(data) {
        console.debug('OrthoGame.reset', data);
        this.board = new OrthoBoard(data.virusCount, data.sizeX, data.sizeY);
        this.notifyObservers();
    }
}