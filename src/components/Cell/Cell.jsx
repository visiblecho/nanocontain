import './Cell.css'

const Cell = (props) => {
  const getCellStyle = () => {
    let classes = ''

    if (props.isInfected && props.revealInfected) return 'infected'
    if (props.isContained) return 'contained'
    if (props.isAnalyzed) {
      if (props.risk === 2) return 'analyzed med-risk'
      if (props.risk > 2) return 'analyzed high-risk'
      return 'analyzed'
    }
    return 'unknown'
  }

  return (
    <div
      className={`cell ${getCellStyle()}`}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      {props.isAnalyzed ? (props.risk > 0 ? props.risk : '') : ''}
    </div>
  )
}

export default Cell
