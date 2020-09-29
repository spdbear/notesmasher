// TODO: イーズアウトさせる
export const myEase = (x: number) => {
  return x
}

export const roundNum = (num: number, digit: number) => {
  return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)
}
