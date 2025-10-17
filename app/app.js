/* app.js

Main app for nanocontain
Currently configured to only have a classic orthogonal grid.

*/

import { Controller } from "./base/mvc.js"
import { OrthoGame } from "./ortho/orthogame.js"
import { OrthoView } from "./ortho/orthoview.js";

// Initializes a new game by creating new controller, model, view instances.
// Future extensions could instantiate different games here, e.g. HexGame & HexView.
const init = (virusCount, columns, rows) => {
    return new Controller(
        new OrthoGame(virusCount, columns, rows),
        new OrthoView(document.querySelector("body"), columns, rows)
    );
}

// Add an event listener for the reset buttons to re-initialize the game.
document.getElementById('new-game')
    .addEventListener('click', event => {
        const data = event.target.dataset;
        controller = init(data.virusCount, data.columns, data.rows)
    });

// Instantiate the controller singleton and start the game.
let controller = init(9, 9, 9);