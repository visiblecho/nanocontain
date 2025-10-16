/* app.js

Main app for nanocontain
Currently configured to only have a classic orthogonal grid.

*/

import { Controller } from "./base/mvc.js"
import { OrthoGame } from "./ortho/orthogame.js"
import { OrthoView } from "./ortho/orthoview.js";

let controller = new Controller(
    new OrthoGame(1, 9, 9),
    // TODO: Change this from body to game. But something didn't work then; debug.
    new OrthoView(document.querySelector("body"), 9, 9)
);

document.getElementById('new-game')
    .addEventListener('click', event => {
        const data = event.target.dataset;
        controller = new Controller(
            new OrthoGame(data.virusCount, data.columns, data.rows),
            new OrthoView(document.querySelector("body"), data.columns, data.rows)
        )
    });