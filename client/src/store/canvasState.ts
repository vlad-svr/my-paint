import { makeAutoObservable } from 'mobx'
import Tool from '../tools/Tool'

class CanvasState {
  canvas!: HTMLCanvasElement
  socket: WebSocket | null = null
  sessionId: string | null = null
  undoList: string[] = []
  redoList: string[] = []
  username: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId
  }

  setSocket(socket: WebSocket) {
    this.socket = socket
  }

  setUsername(username: string) {
    this.username = username
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  undo() {
    let ctx = this.canvas.getContext('2d')

    if (ctx && this.undoList.length > 0) {
      const dataUrl = this.undoList.pop()!
      this.pushToRedo(this.canvas.toDataURL())
      Tool.drawImage(ctx, dataUrl, this.canvas.width, this.canvas.height)
    } else {
      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d')

    if (ctx && this.redoList.length > 0) {
      const dataUrl = this.redoList.pop()!
      this.undoList.push(this.canvas.toDataURL())
      Tool.drawImage(ctx, dataUrl, this.canvas.width, this.canvas.height)
    }
  }
}

export default new CanvasState()
