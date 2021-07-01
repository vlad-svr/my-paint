import express from 'express'
import WS from 'express-ws'
import { Socket } from './ws/Socket'
import { SocketHandler } from './ws/SocketHandler'

const PORT = process.env.PORT || 5000

const { app, getWss, applyTo } = WS(express())

app.ws('/', (ws, req) => {
  console.log('Подключение установлено')
  const socket = new Socket(ws, getWss())
  const wsHandler = new SocketHandler(socket)

  socket.on('connection', (msg) => {
    wsHandler.connection(msg)
  })
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
