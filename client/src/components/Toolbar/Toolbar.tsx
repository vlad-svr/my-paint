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

const Toolbar = () => {
  return (
    <StyledToolbar>
      <ButtonBrush onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
      <ButtonRect onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
      <ButtonCircle onClick={() => toolState.setTool(new Circle(canvasState.canvas))} />
      <ButtonEraser onClick={() => toolState.setTool(new Eraser(canvasState.canvas))} />
      <ButtonLine onClick={() => toolState.setTool(new Line(canvasState.canvas))} />
      <input type="color" style={{ marginLeft: 10 }}></input>
      <ButtonUndo />
      <ButtonRedo />
      <ButtonSave />
    </StyledToolbar>
  )
}

export default Toolbar
