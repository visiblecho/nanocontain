import theme from '../themes.js'

const Statistics = (props) => {
  const stats = props.cells.flat().reduce(
    (acc, cur) => {
      if (cur.isInfected) acc.infected++
      if (cur.isContained) acc.contained++
      if (cur.isAnalyzed) acc.analyzed++
      acc.total++
      return acc
    },
    {
      infected: 0,
      contained: 0,
      analyzed: 0,
      total: 0,
    },
  )

  const statsStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1.5rem 0',
  }

  return (
    <div style={statsStyle}>
      <p style={{ color: theme.colors.cellInfected, margin: 0 }}>
        Infected: {stats.infected} (
        {Math.floor((stats.infected * 100) / stats.total)}%)
      </p>
      <p style={{ color: theme.colors.cellContained, margin: 0 }}>
        Contained: {stats.contained} (
        {Math.floor((stats.contained * 100) / stats.infected)}%)
      </p>
      <p style={{ color: theme.colors.font, margin: 0 }}>
        Analyzed: {stats.analyzed} (
        {Math.floor((stats.analyzed * 100) / stats.total)}%)
      </p>
    </div>
  )
}

export default Statistics
