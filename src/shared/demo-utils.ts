function randomInt(max: number = 6, min: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomSuccess() {
  return Math.random() > 0.5 ? true : false
}

interface IResult {
  code: number
  success: boolean
  data: number
}

export function fetch(duration: number = 2000): Promise<IResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        success: randomSuccess(),
        data: randomInt()
      })
    }, duration)
  })
}