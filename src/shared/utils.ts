export function getSlot(ctx: any, name: string = 'default') {
  const slotFunction = ctx.$slots[name] as Function
  return slotFunction ? slotFunction() : ''
}

export function imageLoader(src: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const imgObj = new Image()
    imgObj.crossOrigin = 'anonymous'

    imgObj.onerror = () => {
      imgObj.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArEAAAGSAQMAAADOxAtrAAAAA1BMVEWXl5cPTYmVAAAAOUlEQVR42u3BgQAAAADDoPtT32AE1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIB4owAAGsmJ4nAAAAAElFTkSuQmCC'
      imgObj.onload = () => {
        imgObj.onload = null
        resolve(imgObj)
      }
      imgObj.onerror = null
    }

    imgObj.onload = () => {
      imgObj.onerror = null
      resolve(imgObj)
    }

    imgObj.src = src
  })
}

export function delay(duration: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
