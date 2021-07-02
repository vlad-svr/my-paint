import { Socket } from './Socket'
import { IMsg, WebSocketEx } from '../intefaces'
import ws from 'ws'

export class SocketHandler {
  private ws: WebSocketEx
  private aWss: ws.Server
  constructor(socket: Socket) {
    this.ws = socket.ws
    this.aWss = socket.aWss
  }

  connection(msg: IMsg) {
    this.ws.id = msg.id
    this.broadcastConnection(msg)
  }

  broadcastConnection(msg: IMsg) {
    this.aWss.clients.forEach((client: WebSocketEx) => {
      if (client.id === msg.id && client.socketId !== this.ws.socketId) {
        client.send(JSON.stringify(msg))
      }
    })
  }
}
