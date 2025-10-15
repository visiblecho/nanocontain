# nanocontain

The virus is spreading! We need a vaccine! But ontageous virus is unknown.

You were able to isolate a few cells: Some of them contain the virus. But if you analyze an infected cell, the virus spreads immediately.

Pick a cell to analyze it. If it is close to an infected cell, you get an alert. Continue your analysis until you have found and contained all infected cells without analyzing one directly.

## TODOs for MVP (7.5h of remaining 15h)

- Restructure the CSS. (.5h)
    - Classes for interaction elements: triggers ("Reset 9x9"), cells, displays with labels.
    - Classes for cell states: unknown, open w/o risk, open w/ risk, contained, infected.
- Complete render(). (2h)
- Restructure HTML and JS so that game-external triggers (like reset) are not part of MVC. (.5h)
- Implement the OrthoGame.analyze() method. (2h)
    - Basic update of the cell status.
    - This must recursively analyze adjacent tells iff the they are not adjacent to an infected cell
- Implement the Orthogame.contain() method (.5h)
- Implement the remaining notify() pieces (.5h)
- Remove the undo/redo stack stub and ensure the system is working with a single state. (.5h)
- Add a timer that resets with every analyze/contain action but ticks down and analyzes an arbitrary cell ... (1h)

## Known Issues (Deferred beyond MVP)

- MVC layer is over-engineered. It does not need the Model.actions[] indirection: There are only analyze() and contain(). Simplify

## Extensions (Deferred beyond Known Issues)

- Implement the undo/redo stack.
- Add a hexagonal 2d grid (requires canvas).
- Add a orthogonal 3d grid (requires canvas).