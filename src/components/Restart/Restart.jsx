const Restart = (props) => {
  return (
    <div className={`overlay ${props.isVisible ? 'visible' : ''}`}>
      <h2>You {props.success ? 'win' : 'lose'}</h2>
      <button onClick={() => props.trigger(9, 9, 9)}>Restart Small</button>
      <button onClick={() => props.trigger(13, 13, 19)}>Restart Large</button>
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
    </div>
  )
}

export default Restart
