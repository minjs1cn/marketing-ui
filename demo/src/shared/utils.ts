import { ref } from 'vue'

export function getSlot(ctx: any, name: string = 'default') {
  const slotFunction = ctx.$slots[name] as Function
  return slotFunction ? slotFunction() : ''
}

export function useEl<T>() {
  const el = ref<T>()
  const setEl = (ele: T) => {
    el.value = ele
  }

  return [el, setEl] as const
}

export function randomInt(max: number = 6, min: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomTrue() {
  return Math.random() > 0.5 ? true : false
}

interface IResult<T> {
  code: number
  success: boolean
  data: T
}

export function fetch<T>(data: T, duration: number = 2000): Promise<IResult<T>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        success: randomTrue(),
        data
      })
    }, duration)
  })
}

export function delay(duration: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}