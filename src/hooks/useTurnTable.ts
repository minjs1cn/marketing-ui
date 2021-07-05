import { imageLoader } from "../shared/utils"
import { Rotate, TOnUpdate } from './useRotate'

interface IOptions {
  el: HTMLCanvasElement | string
  dpr?: number
}

interface ITurnTableOption {
  title: string
  image?: string
  angle?: number
  backgroundColor?: string
  color?: string
}

function angle2Pi(angle: number) {
  return angle / 180 * Math.PI
}

function forEach(options: ITurnTableOption[], callback: (option: ITurnTableOption, index: number, startAngle: number, endAngle: number) => void) {
  let startAngle = 0, endAngle = 0
  const baseAngle = 360 / options.length
  options.forEach((option, index) => {
    startAngle = endAngle
    endAngle = startAngle + (option.angle ? option.angle : baseAngle)
    callback(option, index, startAngle, endAngle)
  })
}

export class TurnTable extends Rotate {

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

  private _el: HTMLCanvasElement | undefined
  /** Canvas */
  public get el() {
    return this._el as HTMLCanvasElement
  }

  public constructor(onUpdate: TOnUpdate) {
    super(onUpdate)
  }

  /**
   * 初始化，只能调用一次，否则可能导致事件多次绑定
   * @param param0 
   */
  public init({ el, dpr }: IOptions) {
    if (typeof el === 'string') {
      el = document.querySelector(el)! as HTMLCanvasElement
    }
    this._ctx = el.getContext('2d') as CanvasRenderingContext2D
    this._dpr = dpr || window.devicePixelRatio
    this._el = el
    this.reset()

    return this
  }

  /**
   * 重置
   */
  public reset() {
    const { el, dpr } = this
    const { offsetWidth, offsetHeight } = (el.parentNode as HTMLElement)
    const { left, top } = el.getBoundingClientRect()
    
    el.width = offsetWidth * dpr
    el.height = offsetHeight * dpr
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.borderRadius = '50%'

    this._offsetX = left
    this._offsetY = top
    this._w = el.width
    this._h = el.height
    this.clear()
  }

  /**
   * 清屏
   */
  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  private options: {
    [index: string]: {
      startAngle: number
      endAngle: number
    }
  } = {}

  /**
   * 
   * @param options 
   */
  public drawOptions(options: ITurnTableOption[]) {
    const { ctx, width } = this
    // 画背景
    forEach(options, (option, index, startAngle, endAngle) => {
      this.options[index] = {
        startAngle,
        endAngle
      }
      if (option.backgroundColor) {
        ctx.save()
        ctx.strokeStyle = option.backgroundColor
        ctx.beginPath()
        ctx.translate(width / 2, width / 2)
        ctx.lineWidth = width
        ctx.arc(0, 0, width / 2, angle2Pi(startAngle), angle2Pi(endAngle))
        ctx.stroke()
        ctx.restore()
      }
    })
    // 画标题
    const fontSize = 12 * this.dpr
    forEach(options, (option, index, startAngle, endAngle) => {
      if (option.title) {
        ctx.save()
        ctx.translate(width / 2, width / 2)
        ctx.rotate(angle2Pi((startAngle + endAngle) / 2 + 90))
        ctx.textAlign = 'center'
        ctx.fillStyle = option.color || '#000'
        ctx.font = fontSize + "px Microsoft YaHei"
        ctx.fillText(option.title, 0, (width / 2 - fontSize / 2) * -1 * 0.9)
        ctx.restore()
      }
    })
    // forEach(options, (option, index, startAngle, endAngle) => {
    //   if (option.title) {
    //     let x = 0, y = width / 2 * -1 + 20 * this.dpr
    //     option.title.split('').forEach(item => {
    //       const sw = ctx.measureText(item).width
    //       ctx.save()
    //       ctx.translate(width / 2, width / 2)
    //       ctx.rotate(angle2Pi((startAngle + endAngle) / 2 + 90))
    //       ctx.textAlign = 'center'
    //       ctx.fillStyle = option.color || '#000'
    //       ctx.font = fontSize + "px Microsoft YaHei"
    //       ctx.fillText(item, x, y)
    //       ctx.restore()
    //       y += fontSize * 1.1
    //     })
    //   }
    // })
    // 画图片
    const imageWidth = width / 2 / 3
    forEach(options, (option, index, startAngle, endAngle) => {
      if (option.image) {
        imageLoader(option.image).then((img) => {
          ctx.save()
          ctx.translate(width / 2, width / 2)
          ctx.rotate(angle2Pi((startAngle + endAngle) / 2 + 90))
          ctx.drawImage(img, imageWidth / 2 * -1, (width / 2 - imageWidth / 2) * -1, imageWidth, imageWidth)
          ctx.restore()
        }).catch()
      }
    })
  }

  /**
   * 计算角度
   * @param index 
   * @returns 
   */
  public getAngleRangeByIndex(index: number) {
    const { startAngle, endAngle } = this.options[index]
    const baseAngle = (startAngle + endAngle) / 2
    return [270 - baseAngle * 2, 270]
  }
}

export default function useTurnTable(onUpdate: TOnUpdate) {
  return new TurnTable(onUpdate)
}
