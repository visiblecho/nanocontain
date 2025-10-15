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
                // cell.textContent = `(${col}|${row})`
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
        // create a 
    }
};