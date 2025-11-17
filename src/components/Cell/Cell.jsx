import theme from '../themes.js'

const Cell = (props) => {
  const baseStyle = {
    aspectRatio: '1',
    border: `2px solid`,
    borderColor: 'transparent',
    borderRadius: '20%',
    transition: 'border-color 1s ease, color 1s ease, background-color 1s ease',
  }

  const getCellStyle = () => {
    if (props.isInfected && props.revealInfected)
      return {
        ...baseStyle,
        background: theme.colors.cellInfected,
      }
    if (props.isContained)
      return {
        ...baseStyle,
        background: theme.colors.cellContained,
      }
    if (props.isAnalyzed)
      return {
        ...baseStyle,
        background: theme.colors.cellAnalyzed,
      }
    return {
      ...baseStyle,
      background: theme.colors.background,
      borderColor: theme.colors.cellUnknownBorder,
    }
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
