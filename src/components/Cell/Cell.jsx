import styles from './Cell.module.css'

const Cell = (props) => {
  const getCellStyle = () => {
    if (props.isInfected && props.revealInfected) return [styles.infected]
    if (props.isContained) return [styles.contained]
    if (props.isAnalyzed) {
      if (props.risk === 2) return [styles.analyzed, styles.medRisk]
      if (props.risk > 2) return [styles.analyzed, styles.highRisk]
      return [styles.analyzed]
    }
    return [styles.unknown]
  }

  return (
    <div
      className={`${styles.cell} ${getCellStyle().join(' ')}`}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      {props.isAnalyzed ? (props.risk > 0 ? props.risk : '') : ''}
    </div>
  )
}

export default Cell
