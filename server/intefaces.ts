import WebSocket from 'ws'

export interface IMsg {
  id: string
  method: string
  username: string
}

export interface WebSocketEx extends WebSocket {
  id?: string
  socketId?: string
}
