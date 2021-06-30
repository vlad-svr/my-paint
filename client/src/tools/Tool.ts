export default class Tool {
  canvas!: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  set fillColor(color: string) {
    if (!this.ctx) return
    this.ctx.fillStyle = color
  }

  set strokeColor(color: string) {
    if (!this.ctx) return
    this.ctx.strokeStyle = color
  }

  set lineWidth(width: number) {
    if (!this.ctx) return
    this.ctx.lineWidth = width
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
  }
}
