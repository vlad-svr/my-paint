import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar/Toolbar'
import styled from 'styled-components'

const AppWrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`

const App = () => {
  return (
    <AppWrapper>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </AppWrapper>
  )
}

export default App
