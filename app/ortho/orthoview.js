/* orthoview.js

Handles the user interface for a orthogonal game

*/

import { View } from "../base/mvc.js"

export class OrthoView extends View {
    constructor(root, columns, rows) {
        super(root);

        /* TODO: Move this to CSS. Use :hover instead
        this.root.addEventListener('pointerdown', event => {
            if (event.target.classList.contains('clickable')) event.target.classList.add('pointerdown')
        })
        this.root.addEventListener('pointerup', event => {
            if (event.target.classList.contains('clickable')) event.target.classList.remove('pointerdown')
        })
        */

        this.configuration = {
            columns: columns,
            rows: rows,
        };

        this.ui = {
            message: document.getElementById('message'),
            infected: document.getElementById('infected'),
            contained: document.getElementById('contained'),
            analyzed: document.getElementById('analyzed'),
            board: document.getElementById('board'),
        }

        // Set up the board strcuture with <div>
        for (let col = 0; col < this.configuration.columns; col++) {
            const column = document.createElement('section');
            column.classList.add('column');
            this.ui.board.appendChild(column);
            for (let row = 0; row < this.configuration.rows; row++) {
                const cell = document.createElement('div');
                cell.setAttribute('id', `${col},${row}`);
                cell.classList.add('cell', 'unknown')
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
        // Counters for the display
        let infected = 9; // ! update
        let contained = 0;
        let analyzed = 0;
        let cellCount = 0;
        
        state.cells.forEach((col, colIdx) => {
            col.forEach((cell, rowIdx) => {
                const cellElement = document.querySelector(`[data-column="${colIdx}"][data-row="${rowIdx}"]`);
                
                // Flush the class list.
                cellElement.classList.remove('contained', 'analyzed', 'infected', 'risk', 'unknown');
                
                // Add classes dpending on cell state
                if (cell !== 'unknown') {
                    if (cell === 'contained') {
                        cellElement.classList.add('contained');
                        contained++;
                    } else if (cell === 'infected') {
                        cellElement.classList.add('infected')
                    } else {
                        cellElement.classList.remove('unknown')
                        cellElement.classList.add('analyzed')
                        if (cell > 0) {
                            cellElement.classList.add('risk')
                            cellElement.textContent = cell
                        }
                        analyzed++;
                    }
                } else cellElement.classList.add('unknown')
                cellCount++;
            })
        });

        this.ui.contained.textContent = `${contained} (${Math.floor(100* contained / infected)}%)`;
        this.ui.analyzed.textContent = `${analyzed} (${Math.floor(100 * analyzed / cellCount)}%)`;

    }
};
