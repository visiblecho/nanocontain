# nanocontain

The virus is spreading! We need a vaccine!
But the contageous virus is unknown.

You were able to isolate a few cells: Some of them contain the virus.

Left-click a cell to analyze it.
Analysis reveals the cell's risk level: the number of infected adjacent cells.

If the analyzed cell is infected, however: The virus spreads and you loose!

Prevent analyzing potentially infected cells by containing them.
Right-click a cell to toggle its containment.

Continue your analysis until you have contained all infected cells without analyzing one directly.

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
- ~~Improve: Limit the number of contained cells to the number of infected cells~~
- Add: Visually handle the win/lose situation (1h)
- ~~Fix: Handle the render() / CSS issue that displays all infected cells after the first user interaction~~
- Fix: The reset functionality is broken (.5h)

## Known Issues (Deferred beyond MVP)

- Improve: Refine the CSS with animations, esp. the flood fill has potential
- Improve: Refine the CSS for different screen sizes
- Add: Timer that counts the seconds since start.
- Add: Timer that resets with every analyze/contain action but ticks down and analyzes an arbitrary cell ... (2h)

## Extensions (Deferred beyond Known Issues)

- Add: Lives to undo analyzing a virus cell
- Add: hexagonal 2d grid (requires canvas).
- Add: orthogonal 3d grid (requires canvas).