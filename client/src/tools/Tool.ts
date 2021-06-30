export default class Tool {
  canvas!: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  destroyEvents() {
    if (!this.ctx) return
    this.canvas.onmousemove = null
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = '#000000'
  }
}
