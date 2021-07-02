import Tool from './Tool'

export default class Rect extends Tool {
  mouseDown = false
  startX = 0
  startY = 0
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
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    this.mouseDown = true
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop
    this.ctx?.beginPath()

    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement

    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft
      const currentY = e.pageY - target.offsetTop

      this.draw(currentX, currentY)
    }
  }

  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved || ''
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.moveTo(x, y)
      this.ctx?.lineTo(this.startX, this.startY)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }
}
