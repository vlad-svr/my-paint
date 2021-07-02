export default class Tool {
  canvas!: HTMLCanvasElement
  socket: WebSocket | null
  id: string | null
  ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement, socket: WebSocket | null, id: string | null) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
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

  static drawImage(ctx: CanvasRenderingContext2D, image: string, width: number, height: number) {
    const img = new Image()
    img.src = image
    img.onload = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
    }
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
  }
}
