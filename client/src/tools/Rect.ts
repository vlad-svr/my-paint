import Tool from './Tool'

export default class Rect extends Tool {
  mouseDown = false
  startX = 0
  startY = 0
  saved: string | null = null

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
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement
    console.log(
      'pageX: ',
      e.pageX,
      'offsetLeft: ',
      target?.offsetLeft,
      'pageY: ',
      e.pageY,
      'offsetTop: ',
      target.offsetTop
    )
    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft
      const currentY = e.pageY - target.offsetTop
      const width = currentX - this.startX
      const height = currentY - this.startY
      this.draw(this.startX, this.startY, width, height)
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved || ''
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.rect(x, y, w, h)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
    console.log('draw rect')
  }
}
