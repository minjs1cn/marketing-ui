import { delay, imageLoader } from "../shared/utils"
import { animate } from 'popmotion'
import { TinyEmitter } from 'tiny-emitter'

function isColor(color: string) {
  return color.indexOf('#') !== -1
}

enum ECoatingStatus {
  INIT,
  READY,
  START,
  OVER
}

export interface IPainterOptions {
  el: HTMLCanvasElement
  dpr?: number
  coating?: string
}

class Painter extends TinyEmitter {
  public static coating = '#979797'

  private _ctx: CanvasRenderingContext2D | undefined
  /** 画布上下文 */
  public get ctx() {
    return this._ctx as CanvasRenderingContext2D
  }

  private _w: number | undefined
  /** 画布宽度 */
  public get width() {
    return this._w as number
  }

  private _h: number | undefined
  /** 画布高度 */
  public get height() {
    return this._h as number
  }

  private _offsetX: number | undefined
  /** 画布左侧偏移量 */
  public get offsetX() {
    return this._offsetX as number
  }

  private _offsetY: number | undefined
  /** 画布上方偏移量 */
  public get offsetY() {
    return this._offsetY as number
  }

  private _dpr: number | undefined
  /** 画布 devicePixelRatio */
  public get dpr() {
    return this._dpr as number
  }

  private _status: ECoatingStatus = ECoatingStatus.INIT
  /** 画布状态 */
  public get status() {
    return this._status
  }

  private _el: HTMLCanvasElement
  /** Canvas */
  public get el() {
    return this._el
  }

  /**
   * 初始化，只能调用一次，否则可能导致事件多次绑定
   * @param param0 
   */
  public init({ el, dpr, coating }: IPainterOptions) {
    this._ctx = el.getContext('2d') as CanvasRenderingContext2D
    this._dpr = dpr || window.devicePixelRatio
    this._el = el
    this.reset(coating)

    this._el.addEventListener('touchstart', (e) => {
      this.emit('touchstart', e)
    })
    this._el.addEventListener('touchmove', (e) => {
      this.emit('touchmove', e)
    })
    this._el.addEventListener('touchend', (e) => {
      this.emit('touchend', e)
    })
    this._el.addEventListener('mousedown', (e) => {
      this.emit('touchstart', e)
    })
    this._el.addEventListener('mousemove', (e) => {
      this.emit('touchmove', e)
    })
    this._el.addEventListener('mouseup', (e) => {
      this.emit('touchend', e)
    })
  }

  /**
   * 重置
   */
  public reset(coating: string = Painter.coating) {
    const { el, dpr } = this
    const { offsetWidth, offsetHeight } = (el.parentNode as HTMLElement)
    const { left, top } = el.getBoundingClientRect()
    
    el.width = offsetWidth * dpr
    el.height = offsetHeight * dpr

    this._offsetX = left
    this._offsetY = top
    this._w = el.width
    this._h = el.height
    this.clear()
    this._status = ECoatingStatus.READY

    this.drawCoating(coating)
  }

  /**
   * 监听按下
   * @param onTouchstart 
   */
  onTouchstart(onTouchstart: (e: TouchEvent | MouseEvent) => void) {
    const wrapper = (e: TouchEvent | MouseEvent) => {
      e.preventDefault()
      if (this.status === ECoatingStatus.OVER) return
      this._status = ECoatingStatus.START
      onTouchstart(e)
    }
    this.on('touchstart', wrapper)
  }

  /**
   * 监听移动
   * @param onTouchmove 
   */
  onTouchmove(onTouchmove: (e: TouchEvent | MouseEvent, x: number, y: number) => void) {
    const wrapper = (e: TouchEvent | MouseEvent) => {
      e.preventDefault()
      if (this.status === ECoatingStatus.START) {
        let x = 0, y = 0
        if (e.type === 'touchmove') {
          const { clientX, clientY } = (e as TouchEvent).touches[0]
          x = clientX
          y = clientY
        } else {
          const { clientX, clientY } = (e as MouseEvent)
          x = clientX
          y = clientY
        }
        onTouchmove(e, x, y)
      }
    }
    this.on('touchmove', wrapper)
  }

  /**
   * 监听抬手
   * @param onTouchend 
   */
  onTouchend(onTouchend: (e: TouchEvent | MouseEvent) => void) {
    const wrapper = (e: TouchEvent | MouseEvent) => {
      e.preventDefault()
      onTouchend(e)
    }
    this.on('touchend', wrapper)
  }

  /**
   * 清屏
   */
  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this._status = ECoatingStatus.OVER
  }

  /**
   * 画涂层
   * @param colorOrSrc 颜色或图片src
   * @returns 
   */
  public drawCoating(colorOrSrc: string) {
    if (isColor(colorOrSrc)) {
      this.drawRect(colorOrSrc)
      return Promise.resolve()
    }

    return this.drawImage(colorOrSrc)
  }

  /**
   * 画矩形
   * @param color 
   */
  private drawRect(color: string) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  /**
   * 画图片
   * @param src 图片src
   * @returns 
   */
  private drawImage(src: string) {
    return imageLoader(src).then(img => {
      this.ctx.drawImage(img, 0, 0, this.width, this.height)
    }).catch()
  }

  /**
   * 以圆形形状擦除画布
   * @param x 圆心x
   * @param y 圆心y
   * @param r 圆半径，默认值 15
   */
  public scrapeoff(x: number, y: number, r?: number) {
    if (!r) r = 15 * this.dpr
    this.ctx.globalCompositeOperation = 'destination-out'
    this.drawCircle((x - this.offsetX) * this.dpr, (y - this.offsetY) * this.dpr, r)
  }

  /**
   * 画圆
   * @param x 圆心x
   * @param y 圆心y
   * @param r 圆半径
   */
  private drawCircle(x: number, y: number, r: number) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }

  /**
   * 获取画布矩形区域内像素数据
   * @param padding 边距
   * @returns 
   */
  private getPixelData(padding: number) {
    return this.ctx.getImageData(padding / 2, padding / 2, this.width - padding / 2, this.height - padding / 2).data
  }

  /**
   * 计算涂层擦除面积比
   * @param padding 边距，默认 0
   * @returns 
   */
  public calculateCoating(padding: number = 0) {
    const pixelData = this.getPixelData(padding)
    let num = 0
    for (let i = 0; i < pixelData.length; i++) {
      if (pixelData[i] === 0) {
        num++
      }
    }
    return num / pixelData.length
  }

  /**
   * 生成自动擦除的数据
   * @param rw 
   * @param rh 
   * @param rd 
   * @returns 
   */
  private createAutoPoints(rw: number = 0.3, rh: number = 0.3, rd: number = 0.08) {
    const points: number[][] = []
    const h = this.height * (1 - rh * 2)
    const total = 3
    const delta = this.height * rd
    for (let i = 0; i <= total; i++) {
      points.push([this.width * rw, h / total * i + this.height * rh])
      points.push([this.width * (1 - rw), h / total * i + this.height * rh - delta])
    }
    return points
  }

  /**
   * 自动擦除画布
   * @param points 擦除数据
   * @param duration 擦除动画时间
   * @returns 第几次擦除结束
   */
  autoScrapeoff(points: number[][], duration: number = 250): Promise<number> {
    if (!points) {
      points = this.createAutoPoints()
    }

    return new Promise(resolve => {
      for (let i = 0; i < points.length - 1; i++) {
        delay(i * duration).then(() => {
          animate({
            from: {
              x: points[i][0],
              y: points[i][1]
            },
            to: {
              x: points[i + 1][0],
              y: points[i + 1][1]
            },
            duration,
            onUpdate: ({ x, y }) => {
              this.scrapeoff(x / this.dpr + this.offsetX, y / this.dpr + this.offsetY)
            },
            onComplete: () => {
              resolve(i)
            }
          })
        })
      }
    })
  }
}

export default function usePainter() {
  return new Painter()
}
