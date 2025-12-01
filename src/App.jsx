import { useState } from 'react'

import Header from './components/Header/Header.jsx'
import Board from './components/Board/Board.jsx'
import Restart from './components/Restart/Restart.jsx'
import './App.css'

const App = () => {
  const Container = () => {
    const [resetKey, setResetKey] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isWon, setIsWon] = useState(false)
    const [boardConfig, setBoardConfig] = useState({
      rows: 9,
      cols: 9,
      infected: 9,
    })

    const triggerReset = (rows, cols, infected) => {
      setBoardConfig({ rows, cols, infected })
      setIsGameOver(false)
      setIsWon(false)
      setResetKey((k) => k + 1)
    }

    return (
      <div className="container">
        <Board
          key={resetKey}
          boardConfig={boardConfig}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          setIsWon={setIsWon}
          className="base"
        />
        <Restart
          success={isWon}
          trigger={triggerReset}
          isVisible={isGameOver}
        />
      </div>
    )
  }

  return (
    // TODO: Fix the layout on the page
    <div style={{ minWidth: '450px', maxWidth: '500px', margin: '10px' }}>
      <Header />
      <Container />
    </div>
  )
}

export default App
