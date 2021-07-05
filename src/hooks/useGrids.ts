import { animate, linear, cubicBezier } from 'popmotion'

export type TOnUpdate = (angle: number) => void

export interface IToProps {
  index: number
  duration?: number
  complete: () => void
}

export class Grids {
  private onUpdate: TOnUpdate
  private _index: number = 0
  public get index() {
    return this._index
  }
  private tw:
    | {
        stop: () => void
      }
    | undefined
  private count: number

  constructor(onUpdate: TOnUpdate, count: number) {
    this.onUpdate = onUpdate
    this.count = count
  }

  /**
   * 闲置状态空转
   */
  public idled(speed: number = 1000) {
    this.stop()
    if (this.index === 0) {
      this.tw = animate({
        from: this.index,
        to: this.count,
        duration: speed * this.count,
        ease: linear,
        repeat: Infinity,
        onUpdate: (index) => {
          this._index = Math.floor(index)
          this.onUpdate(this.index)
        }
      })
    } else {
      this.tw = animate({
        from: this.index,
        to: this.count,
        duration: speed * (this.count - this.index),
        ease: linear,
        onUpdate: (index) => {
          this._index = Math.floor(index)
          this.onUpdate(this.index)
        },
        onComplete: () => {
          this.tw = animate({
            from: this.index,
            to: this.count,
            duration: speed * this.count,
            ease: linear,
            repeat: Infinity,
            onUpdate: (index) => {
              this._index = Math.floor(index)
              this.onUpdate(this.index)
            }
          })
        }
      })
    }
    
  }

  /**
   * 开始抽奖
   */
  public start(duration: number = 200) {
    this.stop();
    this.tw = animate({
      from: this.index,
      to: this.count,
      duration: duration * (this.count - this.index),
      ease: linear,
      onUpdate: (index) => {
        this._index = Math.floor(index)
        this.onUpdate(this.index)
      },
      onComplete: () => {
        this.tw = animate({
          from: 0,
          to: this.count,
          duration: duration * this.count,
          ease: linear,
          repeat: Infinity,
          onUpdate: (index) => {
            this._index = Math.floor(index)
            this.onUpdate(this.index)
          }
        })
      }
    })
  }

  /**
   * 转到中奖结果处
   * @param data - 抽奖结果
   */
  public to(data: IToProps) {
    this.stop()

    this.tw = animate({
      from: this.index,
      to: data.index,
      duration: data.duration || 1000,
      ease: cubicBezier(0.33, 1, 0.68, 1),
      onUpdate: (index) => {
        this._index = Math.floor(index)
        this.onUpdate(this.index)
      },
      onComplete: () => {
        data.complete()
      },
    })
  }

  /**
   * 停止转动
   */
  public stop() {
    this.tw?.stop()
  }

  /**
   * 根据目标下标获取角度范围
   * @param index 目标下标
   * @returns 
   */
   public getAngleRangeByIndex(index: number) {
    return [0 - 60 * index, 60 - 60 * index]
  }
}

export default function useGrids(onUpdate: TOnUpdate, count: number) {
  return new Grids(onUpdate, count)
}
