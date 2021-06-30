import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas!: HTMLCanvasElement
  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }
}

export default new CanvasState()
