import styled from 'styled-components'

const StyledToolbar = styled.div`
  height: ${({ theme }) => theme.main.toolbarHeight};
  background-color: white;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  box-shadow: 0 4px 5px gray;
  z-index: 999;
`

const Toolbar = () => {
  return <StyledToolbar></StyledToolbar>
}

export default Toolbar
