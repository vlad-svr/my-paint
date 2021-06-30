import styled from 'styled-components'
import imgBrush from '../../assets/img/brush.png'
import imgRect from '../../assets/img/rect.png'
import imgCircle from '../../assets/img/circle.png'
import imgEraser from '../../assets/img/eraser.png'
import imgLine from '../../assets/img/line.png'
import imgUndo from '../../assets/img/undo.png'
import imgRedo from '../../assets/img/redo.png'
import imgSave from '../../assets/img/save.png'

export const StyledBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  box-shadow: 0 4px 5px gray;
`

export const StyledToolbar = styled(StyledBar)`
  height: ${({ theme }) => theme.main.toolbarHeight};
  background-color: white;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  box-shadow: 0 4px 5px gray;
  z-index: 999;
`

export const Button = styled.button`
  height: 25px;
  width: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  background-size: cover;
  margin-left: 10px;
`

export const ButtonBrush = styled(Button)`
  background: url(${imgBrush}) no-repeat center center;
`

export const ButtonRect = styled(Button)`
  background: url(${imgRect}) no-repeat center center;
`

export const ButtonCircle = styled(Button)`
  background: url(${imgCircle}) no-repeat center center;
`

export const ButtonEraser = styled(Button)`
  background: url(${imgEraser}) no-repeat center center;
`

export const ButtonLine = styled(Button)`
  background: url(${imgLine}) no-repeat center center;
`

export const ButtonUndo = styled(Button)`
  margin-left: auto;
  background: url(${imgUndo}) no-repeat center center;
`

export const ButtonRedo = styled(Button)`
  background: url(${imgRedo}) no-repeat center center;
`

export const ButtonSave = styled(Button)`
  background: url(${imgSave}) no-repeat center center;
  margin-right: 10px;
`
