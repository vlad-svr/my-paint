import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar/Toolbar'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const AppWrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Switch>
          <Route path="/:id">
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  )
}

export default App
