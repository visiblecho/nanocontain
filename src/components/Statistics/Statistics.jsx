import styles from './Statistics.module.css'

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

  return (
    <div className={styles.statistics}>
      <p className={styles.infected}>
        Infected: {stats.infected} (
        {Math.floor((stats.infected * 100) / stats.total)}%)
      </p>
      <p className={styles.contained}>
        Contained: {stats.contained} (
        {Math.floor((stats.contained * 100) / stats.infected)}%)
      </p>
      <p className={styles.analyzed}>
        Analyzed: {stats.analyzed} (
        {Math.floor((stats.analyzed * 100) / stats.total)}%)
      </p>
    </div>
  )
}

export default Statistics
