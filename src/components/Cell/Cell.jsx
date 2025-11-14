const Cell = (props) => {
  const baseStyle = {
    aspectRatio: '1',
    border: '1px solid cyan',
    background: 'darkcyan',
  }

  const getCellStyle = () => {
    if (props.isInfected) return { ...baseStyle, background: 'red', borderColor: 'red' }
    if (props.isContained) return { ...baseStyle, background: 'cyan' }
    if (props.isAnalyzed) return { ...baseStyle, background: 'black', borderColor: 'black' }
    return { ...baseStyle, background: 'darkcyan' } 
  }

  return (
    <div
      style={getCellStyle()}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    />
  )
}

export default Cell
