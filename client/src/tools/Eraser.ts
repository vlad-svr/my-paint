import Brush from './Brush'

export default class Eraser extends Brush {
  draw(x: number, y: number) {
    if (!this.ctx) return
    this.ctx.lineTo(x, y)
    this.strokeColor = 'white'
    this.ctx?.stroke()
  }
}
