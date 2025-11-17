import theme from '../themes.js'

const Cell = (props) => {
  const baseStyle = {
    aspectRatio: '1',
    border: `2px solid ${theme.colors.cellBorderShade}`,
    // background: theme.colors.cellUnknown,
  }

  const getCellStyle = () => {
    if (props.isInfected && props.revealInfected)
      return { ...baseStyle, background: theme.colors.cellInfected }
    if (props.isContained)
      return { ...baseStyle, background: theme.colors.cellContained }
    if (props.isAnalyzed)
      return { ...baseStyle, background: theme.colors.cellAnalyzed }
    return { ...baseStyle, background: theme.colors.cellUnknown }
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
