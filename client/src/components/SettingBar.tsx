import styled from 'styled-components'

const StyledSettingBar = styled.div`
  height: ${({ theme }) => theme.main.toolbarHeight};
  background-color: white;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  box-shadow: 0 4px 5px gray;
  top: ${({ theme }) => theme.main.toolbarHeight};
`

const SettingBar = () => {
  return <StyledSettingBar></StyledSettingBar>
}

export default SettingBar
