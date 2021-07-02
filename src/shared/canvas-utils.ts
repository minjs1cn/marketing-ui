export class PaintBrush {
  private _ctx: CanvasRenderingContext2D | undefined
  public get ctx() {
    return this._ctx as CanvasRenderingContext2D
  }

  private _w: number | undefined
  public get width() {
    return this._w as number
  }

  private _h: number | undefined
  public get height() {
    return this._h as number
  }

  init(el: HTMLCanvasElement, dpr: number = 2) {
    el.width = (el.parentNode as HTMLDivElement).offsetWidth * dpr
    el.height = (el.parentNode as HTMLDivElement).offsetHeight * dpr
    this._w = el.width
    this._h = el.height
    this._ctx = el.getContext('2d') as CanvasRenderingContext2D
    this._ctx.clearRect(0, 0, el.width, el.height)
  }

  drwaCoating(color: string) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}