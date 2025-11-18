import { useState } from 'react'

import Header from './components/Header/Header.jsx'
import Board from './components/Board/Board.jsx'
import Restart from './components/Restart/Restart.jsx'
import './App.css'

const App = () => {
  const Container = ({ showOverlay }) => {
    const [resetKey, setResetKey] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isWon, setIsWon] = useState(false)

    const triggerReset = () => setResetKey((k) => k++)

    return (
      <div className="container">
        <Board
          key={resetKey}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          setIsWon={setIsWon}
          className="base"
        />
        {isGameOver && <Restart success={isWon} trigger={triggerReset} />}
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
