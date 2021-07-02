import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import Brush from '../../tools/Brush'
import Rect from '../../tools/Rect'
import Circle from '../../tools/Circle'
import Eraser from '../../tools/Eraser'
import Line from '../../tools/Line'

import {
  StyledToolbar,
  ButtonBrush,
  ButtonRect,
  ButtonCircle,
  ButtonLine,
  ButtonEraser,
  ButtonUndo,
  ButtonRedo,
  ButtonSave,
} from './components'
import { ChangeEvent } from 'react'

const Toolbar = () => {
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = canvasState.sessionId + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <StyledToolbar>
      <ButtonBrush
        onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <ButtonRect
        onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <ButtonCircle
        onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <ButtonEraser
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <ButtonLine
        onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <input onChange={(e) => changeColor(e)} type="color" style={{ marginLeft: 10 }}></input>
      <ButtonUndo onClick={() => canvasState.undo()} />
      <ButtonRedo onClick={() => canvasState.redo()} />
      <ButtonSave onClick={() => download()} />
    </StyledToolbar>
  )
}

export default Toolbar
