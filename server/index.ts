import express from 'express'
import WS from 'express-ws'
import { Socket } from './ws/Socket'
import { SocketHandler } from './ws/SocketHandler'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const PORT = process.env.PORT || 5000

const { app, getWss, applyTo } = WS(express())

app.use(express.json())
app.use(cors())

app.ws('/', (ws, req) => {
  console.log('Подключение установлено')
  const socket = new Socket(ws, getWss())
  const wsHandler = new SocketHandler(socket)

  socket.on('connection', (msg) => {
    wsHandler.connection(msg)
  })

  socket.on('draw', (msg) => {
    wsHandler.broadcastConnection(msg)
  })
})

app.post('/image', (req: express.Request, res: express.Response) => {
  try {
    const image = req.body.image
    fs.writeFileSync(path.resolve(__dirname, 'files', image.name), image.imageUrl, 'base64')
    return res.status(200).json({ message: 'success' })
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})
app.get('/image/:id', (req: express.Request, res: express.Response) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.params.id}.jpg`))
    res.json(file.toString('base64'))
  } catch (e) {
    console.log(e)
    return res.status(500).json('error')
  }
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
