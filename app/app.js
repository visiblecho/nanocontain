/* app.js

Main app for nanocontain
Currently configured to only have a classic orthogonal grid.

*/

import { Controller } from "./base/mvc.js"
import { OrthoGame } from "./ortho/orthogame.js"
import { OrthoView } from "./ortho/orthoview.js";

const controller = new Controller(
    // TODO: Need to push the conig into the classes so that reset() works.
    new OrthoGame(9, 9, 9),
    // TODO: Change this from body to game. But something didn't work then; debug.
    new OrthoView(document.querySelector("body"), 9, 9)
);