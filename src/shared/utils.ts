export function getSlot(ctx: any, name: string = 'default') {
  const slotFunction = ctx.$slots[name] as Function
  return slotFunction ? slotFunction() : ''
}

export const img404 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQMAAACyIsh+AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAUlJREFUaN7t1TFqwzAUxvEnBNXSKmsGt75Cs7lQyFV6BHfzFvckvYp7kig38NjNfc+uPD29gLO08P2JQZBfQJJthQghhBBCCCGE/mKer/t59KyDwNc0yKgtAndJBtiJaWQ06qAmilTxwBXAkfjrKLPdCk7EM5ClhAKYiDoKPc+2AM6yPs/gQQfuLOvzvFOPOvCfGbwUQC0b4HkrDzoIDJJ86F0HsZafC7jooFrASO5LB/sVfOigycAXQFtTYPBNoXA33zK4K4CUQdSBGzKoCqDPYK8Dv4JGB4GfyTAIaHUQV5A2gioDN+igycD3BkgGaDMIhTcrZRA3AjdkUOnAT5yA8ciDsQD8LWA+QJZnsniArC+OAcbrwJvg9+2+BXTzCWOCYIPX+ZQzwHJOGuDpGtiZZzWD0Hc2WP4vDECn3gAIIYQQQggh9N/7AeckpsDN+iALAAAAAElFTkSuQmCC'

export const imgGray = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArEAAAGSAQMAAADOxAtrAAAAA1BMVEWXl5cPTYmVAAAAOUlEQVR42u3BgQAAAADDoPtT32AE1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIB4owAAGsmJ4nAAAAAElFTkSuQmCC'

export function imageLoader(src: string, def: string = imgGray): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const imgObj = new Image()
    imgObj.crossOrigin = 'anonymous'

    imgObj.onerror = () => {
      imgObj.src = def
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
