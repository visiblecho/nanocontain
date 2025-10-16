/* orthoview.js

Handles the user interface for a orthogonal game

*/

import { View } from "../base/mvc.js"

export class OrthoView extends View {
    constructor(root, columns, rows) {
        super(root);

        this.configuration = {
            columns: columns,
            rows: rows,
        };

        this.ui = {
            infected: document.getElementById('infected'),
            contained: document.getElementById('contained'),
            analyzed: document.getElementById('analyzed'),
            board: document.getElementById('board'),
        }

        // Clean the board
        this.ui.board.innerHTML = '';

        // Set up the board strcuture with <div>
        for (let col = 0; col < this.configuration.columns; col++) {
            const column = document.createElement('section');
            column.classList.add('column');
            this.ui.board.appendChild(column);
            for (let row = 0; row < this.configuration.rows; row++) {
                const cell = document.createElement('div');
                cell.setAttribute('id', `${col},${row}`);
                cell.classList.add('cell', 'unknown')
                cell.textContent = '';
                cell.dataset.column = col;
                cell.dataset.row = row;
                cell.dataset.actionLeft = 'analyze';
                cell.dataset.actionRight = 'contain';
                column.appendChild(cell);
            }
        }
    }

    // Renders the given state to the UI
    render(state) {        
        state.cells.forEach((col, colIdx) => {
            col.forEach((cell, rowIdx) => {
                const cellElement = document.querySelector(`[data-column="${colIdx}"][data-row="${rowIdx}"]`);
                
                // Set all classes to "cell unknown" (and reset all other classes).
                cellElement.className = 'cell unknown';

                // Add other visual classes dependning on cell state
                if (cell !== 'unknown') {
                    if (cell === 'infected') cellElement.classList.add('infected')
                    else if (cell === 'contained') cellElement.classList.add('contained')
                    else {
                        cellElement.classList.add('analyzed')
                        if (cell > 0) {
                            cellElement.classList.add('risk')
                            cellElement.textContent = cell
                        }
                    }
                }
            })
        });

        this.ui.contained.textContent =
            `${state.containedCells} (${Math.floor(100* state.containedCells / state.virusCount)}%)`;
        this.ui.analyzed.textContent =
            `${state.analyzedCells} (${Math.floor(100 * state.analyzedCells / (state.columns * state.rows))}%)`;
    }
};
