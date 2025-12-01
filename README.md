# nanocontain

Post-covid interpretation of a simple game from the 1990s.

## How to play

The virus is spreading! Find and contain all infected cells.
_Left-click_ a cell to analyze it. The number shows how many infected cells are next to it. If you analyze an infected cell, the virus spreads and you _lose_!
_Right-click_ a cell to mark it as contained. Contain all infected cells without analyzing one to _win_.

## How to get started with the code

1. Download with `git clone https://github.com/visiblecho/nanocontain.git`.
1. Install all packages with `npm install`.
1. Start the development server with `npm run dev`.

The project depends on React via Vite.

## How to extend

The following features have not been implemented yet:

### Add time pressure

As a user, when I start, I can

- set a timer so I can compete against my own countdown
- set a timer so I
- enable dynamic mode so that the virus continues to infect non-analyzed, non-contained cells in irregular intervals.

### Adjust difficulty

As a user, when I start, I can configure the number of columns, rows, and infected cells so I can adjust difficulty.

### Change board topology

As a user, when I start, I can

- switch to a hexagonal grid (instead of orthogonal) so I can explore different infection patterns.
- switch to a 3d orthogonal grid (instead of 2d) so I can explore different infection patterns.
