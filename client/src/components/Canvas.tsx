import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'

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

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, [])

  return (
    <StyledCanvasWrap>
      <StyledCanvas ref={canvasRef} width={800} height={600} />
    </StyledCanvasWrap>
  )
})

export default Canvas
