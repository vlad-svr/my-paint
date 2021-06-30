import Tool from './Tool'

export default class Brush extends Tool {
  mouseDown = false
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
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
    const target = e.target as HTMLElement
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - target?.offsetLeft, e.pageY - target.offsetTop)
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (this.mouseDown) {
      this.draw(e.pageX - target?.offsetLeft, e.pageY - target.offsetTop)
    }
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()
  }
}
