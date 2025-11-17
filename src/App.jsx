import Header from './components/Header/Header.jsx'
import Board from './components/Board/Board.jsx'

const App = () => {
  return (
    // TODO: Fix the layout on the page
    <div style={{ minWidth: '450px', maxWidth: '500px', margin: '10px' }}>
      <Header />
      <Board />
    </div>
  )
}

export default App
