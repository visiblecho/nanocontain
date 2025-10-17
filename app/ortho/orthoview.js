/* orthoview.js

Handles the user interface for a orthogonal game

*/

import { View } from "../base/mvc.js"

export class OrthoView extends View {
    constructor(root, columns, rows) {
        super(root);

        // Store the board's configuration
        this.configuration = {
            columns: columns,
            rows: rows,
        };

        // Cache DOM elements
        this.ui = {
            header: document.querySelector('header'),
            infected: document.getElementById('infected'),
            contained: document.getElementById('contained'),
            analyzed: document.getElementById('analyzed'),
            board: document.getElementById('board'),
            overlay: document.getElementById('overlay'),
            message: document.getElementById('message'),
        }

        // Clean the board's child elements
        this.ui.board.innerHTML = '';

        // Create the board strcuture with <div>s
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

        // Enable color theme switching by clicking the header.
        this.colors = {
            currentIdx: 0,
            themes: [
                'dark-colors',
                'light-colors',
                'rotate-colors',
            ],
        }
        this.ui.header.addEventListener('click', _ => {
            this.colors.currentIdx++;
            if (this.colors.currentIdx >= this.colors.themes.length) this.colors.currentIdx = 0;
            this.root.classList = this.colors.themes[this.colors.currentIdx];
        });

        // Hide the overlay (if active anyways)
        this.hideOverlay();
    }

    // Utility functions to show and hide the overlay.
    showOverlay(message) {
        this.ui.message.textContent = message;
        this.ui.overlay.classList.remove('hidden');
    }
    
    hideOverlay() {
        this.ui.overlay.classList.add('hidden');
    }

    // Renders the given state to the UI.
    render(state) {        
        state.cells.forEach((col, colIdx) => {
            col.forEach((cell, rowIdx) => {
                // Get the <div> element.
                const cellElement = document.querySelector(`[data-column="${colIdx}"][data-row="${rowIdx}"]`);
                
                // Reset visual classes
                cellElement.className = 'cell unknown';
                cellElement.textContent = ''

                // Add other visual classes depending on cell state.
                if (cell !== 'unknown') {
                    cellElement.classList.remove('unknown');
                    if ((cell === 'infected') && (state.isWon === false)) cellElement.classList.add('infected')
                    else if (cell === 'contained') cellElement.classList.add('contained')
                    else {
                        cellElement.classList.add('analyzed')
                        if (cell > 0) {
                            cellElement.classList.add(
                                cell < 2 ? 'risk-low' : cell < 3 ? 'risk-medium' : 'risk-high'
                            )
                            cellElement.textContent = cell
                        }
                    }
                }
            })
        });

        // Update the header's statstics.
        this.ui.infected.textContent =
            `${state.virusCount} (${Math.floor(100* state.virusCount / (state.columns * state.rows))}%)`;;
        this.ui.contained.textContent =
            `${state.containedCells} (${Math.floor(100* state.containedCells / state.virusCount)}%)`;
        this.ui.analyzed.textContent =
            `${state.analyzedCells} (${Math.floor(100 * state.analyzedCells / (state.columns * state.rows))}%)`;

        // If the game is over, show the overlay.
        if (state.isActive === false) {
            this.showOverlay(state.isWon ? 'You win!' : 'You lose!')
        } else this.hideOverlay();
    }
}