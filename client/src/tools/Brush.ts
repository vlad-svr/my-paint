import Tool from './Tool'

export default class Brush extends Tool {
  mouseDown = false
  name = 'brush'
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
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true
    this.sendFinishDraw()
    this.ctx?.beginPath()
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (this.mouseDown && this.ctx) {
      const x = e.pageX - target?.offsetLeft
      const y = e.pageY - target.offsetTop
      Brush.draw(this.ctx, x, y)
      this.sendDraw(x, y)
    }
  }

  sendDraw(x: number, y: number) {
    this.socket?.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: this.name,
          x,
          y,
        },
      })
    )
  }

  sendFinishDraw() {
    this.socket?.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
        },
      })
    )
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
