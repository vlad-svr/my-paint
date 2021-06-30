import Brush from './Brush'

export default class Eraser extends Brush {
  draw(x: number, y: number) {
    if (!this.ctx) return
    console.log(this.ctx)
    this.ctx.lineTo(x, y)
    this.ctx.lineWidth = 20
    this.ctx.strokeStyle = 'white'
    this.ctx?.stroke()
  }
}
