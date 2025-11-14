const Cell = (props) => {
  const cellStyle = {
    aspectRatio: '1',
    border: '1px solid cyan',
    background: 'darkcyan',
  }

  return (
    <div
      style={cellStyle}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
  )
}

export default Cell
