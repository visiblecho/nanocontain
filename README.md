# nanocontain

The virus is spreading! We need a vaccine! But ontageous virus is unknown.

You were able to isolate a few cells: Some of them contain the virus. But if you analyze an infected cell, the virus spreads immediately.

Pick a cell to analyze it. If it is close to an infected cell, you get an alert. Continue your analysis until you have found and contained all infected cells without analyzing one directly.

## TODOs for MVP

- ~~Restructure the CSS. (.5h)~~
    - ~~Classes for interaction elements: triggers ("Reset 9x9"), cells, displays with labels.~~
    - ~~Classes for cell states: unknown, open w/o risk, open w/ risk, contained, infected.~~
- ~~Complete render(). (1h)~~
- ~~Restructure HTML and JS so that game-external triggers (like reset) are not part of MVC. (.5h)~~
- ~~Implement the OrthoGame.analyze() method. (2h)~~
    - ~~Basic update of the cell status.~~
    - ~~This must recursively analyze adjacent tells iff the they are not adjacent to an infected cell~~
- ~~Implement the Orthogame.contain() method (.5h)~~
- ~~Implement the remaining notify() pieces (.5h)~~
- Fix: Handle the render() / CSS issue that displays all infected cells after the first user interaction
- Improve: Limit the number of contained cells to the number of infected cells 
- Improve: Remove the undo/redo stack stub and ensure the system is working with a single state. (.5h)
- Add: Visually handle the win/loose situation (1h)
- Fix: Redo the reset functionality (.5h)
- Add: Add a timer that resets with every analyze/contain action but ticks down and analyzes an arbitrary cell ... (2h)

## Known Issues (Deferred beyond MVP)

- Improve: MVC layer is over-engineered. It does not need the Model.actions[] indirection: There are only analyze() and contain(). Simplify
- Improve: Refine the CSS with animations, esp. the flood fill has potential

## Extensions (Deferred beyond Known Issues)

- ~~Won't do: Implement the undo/redo stack.~~
- Add: hexagonal 2d grid (requires canvas).
- Add: orthogonal 3d grid (requires canvas).