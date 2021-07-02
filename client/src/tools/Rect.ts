import Tool from './Tool'

export default class Rect extends Tool {
  name = 'rect'
  mouseDown = false
  startX = 0
  startY = 0
  width = 0
  height = 0
  saved: string | null = null

  constructor(canvas: HTMLCanvasElement, socket: WebSocket | null, id: string | null) {
    super(canvas, socket, id)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
  }

  mouseUpHandler(e: MouseEvent): void {
    this.mouseDown = false
    this.sendDraw()
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft
      const currentY = e.pageY - target.offsetTop
      this.width = currentX - this.startX
      this.height = currentY - this.startY
      this.redraw(this.startX, this.startY)
    }
  }

  sendDraw() {
    this.socket?.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: this.name,
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx?.fillStyle,
        },
      })
    )
  }

  redraw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved || ''
    img.onload = () => {
      if (!this.ctx) return
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      Rect.draw(this.ctx, x, y, this.width, this.height)
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color?: string) {
    if (color) ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
}
