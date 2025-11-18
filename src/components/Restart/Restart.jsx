const Restart = (props) => {
  return (
    <div className="overlay">
      <h2>You {props.success ? 'win' : 'lose'}</h2>
      <h3>How to play</h3>
      <p>The virus is spreading! Find and contain all infected cells.</p>
      <p>
        Left-click a cell to analyze it. The number shows how many infected
        cells are next to it. If you analyze an infected cell, the virus spreads
        and you lose!
      </p>
      <p>
        Right-click a cell to mark it as contained. Contain all infected cells
        without analyzing one to win.
      </p>
      <button onClick={props.trigger}>Restart</button>
    </div>
  )
}

export default Restart
