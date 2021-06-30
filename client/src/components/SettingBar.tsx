import styled from 'styled-components'
import toolState from '../store/toolState'
import { StyledBar } from './Toolbar/components'
import { ChangeEvent } from 'react'

const StyledSettingBar = styled(StyledBar)`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.main.toolbarHeight};
  top: ${({ theme }) => theme.main.toolbarHeight};
`

const SettingBar = () => {
  return (
    <StyledSettingBar>
      <label style={{ margin: '0 15px 0 20px' }} htmlFor="line-width">
        Толщина линии
      </label>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => toolState.setLineWidth(Number(e.target.value))}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label style={{ margin: '0 15px 0 20px' }} htmlFor="stroke-color">
        Цвет обводки
      </label>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => toolState.setStrokeColor(e.target.value)}
        id="stroke-color"
        type="color"
      />
    </StyledSettingBar>
  )
}

export default SettingBar
