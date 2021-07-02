import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WS_SERVER } from '../api/api'
import { ImageAPI } from '../api/image-api'
import { Tools } from '../interfaces'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Tool from '../tools/Tool'

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

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  height: 40px;
  border: none;
  border-bottom: 1px solid #dee2e6;
  padding: 0 10px 5px 10px;
  font-size: 26px;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`

interface IMsg {
  id: string
  method: string
  username: string
  userId: string
}

export interface IMsgFigure extends IMsg {
  figure: {
    type: Tools
  } & any
}

const Canvas = observer(() => {
  const params = useParams<{ id: string }>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const [modal, setModal] = useState(true)

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      drawImage()
    }
  }, [])

  const drawImage = async () => {
    const res = await ImageAPI.getImage(params.id)
    const image = `data:image/png;base64,` + res.data
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && canvasRef.current) {
      Tool.drawImage(ctx, image, canvasRef.current.width, canvasRef.current.height)
    }
  }

  useEffect(() => {
    if (canvasState.username && canvasRef.current) {
      const socket = new WebSocket(WS_SERVER)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        console.log('Подключение установлено')
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection',
          })
        )
      }

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`Пользователь ${msg.username} подключился`)
            break
          case 'draw':
            drawHandler(msg)
        }
      }
    }
  }, [modal])

  const drawHandler = (msg: IMsgFigure) => {
    if (!canvasRef.current) return
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'rect':
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
        break
      case 'finish':
        ctx.beginPath()
        break
    }
  }

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  const mouseUpHandler = async () => {
    if (canvasRef.current) {
      const image = {
        name: `${params.id}.jpg`,
        imageUrl: canvasRef.current.toDataURL().replace('data:image/png;base64,', ''),
      }
      await ImageAPI.sendImage(image)
    }
  }

  const connectionHandler = () => {
    if (usernameRef.current && usernameRef.current.value) {
      canvasState.setUsername(usernameRef.current.value)
      setModal(false)
    }
  }

  return (
    <StyledCanvasWrap>
      <Modal show={modal} onHide={() => {}} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledInput type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectionHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <StyledCanvas
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef}
        width={800}
        height={500}
      />
    </StyledCanvasWrap>
  )
})

export default Canvas
