import styled from 'styled-components'

const StyledCanvasWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCanvas = styled.canvas`
  border: 1px solid black;
  background-color: white;
`

const Canvas = () => {
  return (
    <StyledCanvasWrap>
      <StyledCanvas />
    </StyledCanvasWrap>
  )
}

export default Canvas
