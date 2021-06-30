import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas!: HTMLCanvasElement
  undoList: string[] = []
  redoList: string[] = []

  constructor() {
    makeAutoObservable(this)
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

    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop()!
      this.pushToRedo(this.canvas.toDataURL())
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    } else {
      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d')

    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop()!
      this.undoList.push(this.canvas.toDataURL())
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    }
  }
}

export default new CanvasState()
