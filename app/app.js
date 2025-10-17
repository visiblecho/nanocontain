/* app.js

Main app for nanocontain
Currently configured to only have a classic orthogonal grid.

*/

import { Controller } from "./base/mvc.js"
import { OrthoGame } from "./ortho/orthogame.js"
import { OrthoView } from "./ortho/orthoview.js";

const init = (virusCount, columns, rows) => {
    const controller = new Controller(
        new OrthoGame(virusCount, columns, rows),
        new OrthoView(document.querySelector("body"), columns, rows)
    );
    controller.model.notifyObservers();
}

document.getElementById('new-game')
    .addEventListener('click', event => {
        const data = event.target.dataset;
        controller = init(data.virusCount, data.columns, data.rows)
    });

let controller = init(9, 9, 9);