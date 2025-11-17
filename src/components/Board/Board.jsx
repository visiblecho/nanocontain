import { useState } from 'react'
import Statistics from '../Statistics/Statistics.jsx'
import Cell from '../Cell/Cell.jsx'

const Board = () => {
  /* Cofiguration and setup (model) */

  const generateBoard = (rows = 9, cols = 9, infections = 9) => {
    // Create a 2D array of cells with default values (no cell infected)
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isInfected: false,
        isAnalyzed: false,
        isContained: false,
        risk: 0,
      })),
    )

    // Infect cells randomly
    let infectedCells = 0
    while (infectedCells < infections) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      if (!board[row][col].isInfected) {
        board[row][col].isInfected = true
        infectedCells++
      }
    }

    // Compute the cells' risk level (number of infected neighbours)
    const neighbours = [
      // movement as [row, col]
      [-1, -1], // up left
      [-1, 0], // up
      [-1, 1], // up right
      [0, -1], // left
      [0, 1], // right
      [1, -1], // down left
      [1, 0], // down
      [1, 1], // down right
    ]

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c].isMine) continue

        let count = 0
        for (const [dr, dc] of neighbours) {
          const nr = r + dr
          const nc = c + dc
          if (
            // Validate that [nr, nc] is on the board ...
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            // ... and only then check for .isInfected
            board[nr][nc].isInfected
          ) {
            count++
          }
        }
        board[r][c].risk = count
      }
    }

    return board
  }

  const updateBoard = (key, value, y, x) => {
    const newBoard = cells.map((row, rowIndex) =>
      rowIndex === y
        ? row.map((cell, colIndex) =>
            colIndex === x ? { ...cell, [key]: value } : cell,
          )
        : row,
    )
    return newBoard
  }

  const [cells, setCells] = useState(generateBoard())

  /* User interactions (controller) */

  const handleCellAnalysis = (y, x) => {
    if (!cells[y][x].isAnalyzed && !cells[y][x].isContained) {
      setCells(updateBoard('isAnalyzed', true, y, x))
    }
  }

  const handleCellContainment = (e, y, x) => {
    e.preventDefault()
    const newValue = !cells[y][x].isContained
    setCells(updateBoard('isContained', newValue, y, x))
  }

  /* Component view */

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gap: '10px',
  }

  return (
    <>
      <Statistics />
      <div className="board" style={boardStyle}>
        {cells.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              {...cell}
              revealInfected={false}
              onClick={() => handleCellAnalysis(y, x)}
              onContextMenu={(e) => handleCellContainment(e, y, x)}
            />
          )),
        )}
      </div>
    </>
  )
}

export default Board
