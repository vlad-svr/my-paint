import { IMsg, WebSocketEx } from '../intefaces'
import ws from 'ws'
import EventEmitter from 'events'

export class Socket {
  private emitter: EventEmitter
  ws: WebSocketEx
  aWss: ws.Server
  constructor(ws: WebSocketEx, aWss: ws.Server) {
    this.ws = ws
    this.aWss = aWss
    this.emitter = new EventEmitter()
    this.ws.socketId = `ui${(+new Date()).toString(16)}`
    this.listen()
  }

  private listen = () => {
    this.ws.on('message', (json: string) => {
      const msg: IMsg = JSON.parse(json)
      this.emitter.emit(msg.method, msg)
    })
  }

  on(event: string, cb: (data: IMsg) => void) {
    this.emitter.on(event, cb)
  }
}
