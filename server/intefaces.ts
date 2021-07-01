import ws from 'ws'

export interface IMsg {
  id: string
  method: string
  username: string
}

export interface IWSocket extends ws {
  id: string
}
import WebSocket from 'ws'

export interface WebSocketEx extends WebSocket {
  id?: string
}
