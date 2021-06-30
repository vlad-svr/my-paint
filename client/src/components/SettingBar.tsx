import styled from 'styled-components'
import { StyledBar } from './Toolbar/components'

const StyledSettingBar = styled(StyledBar)`
  height: ${({ theme }) => theme.main.toolbarHeight};
  top: ${({ theme }) => theme.main.toolbarHeight};
`

const SettingBar = () => {
  return <StyledSettingBar></StyledSettingBar>
}

export default SettingBar
