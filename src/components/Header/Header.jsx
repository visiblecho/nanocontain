import theme from '../themes.js'

const Header = () => {
  const headerStyle = {
    fontFamily: '"Audiowide", sans-serif',
    fontWeight: '400',
    fontSize: '3em',
    color: theme.colors.headerFont,
    margin: '1.5rem 0',
  }

  return <h1 style={headerStyle}>nanocontain</h1>
}

export default Header
