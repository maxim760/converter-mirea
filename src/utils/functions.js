import NP from 'number-precision'

export const getReadableCaption = (count, [a, b, c]) => {
  const count100 = Math.floor(Math.abs(count) % 100)
  const count10 = Math.floor(Math.abs(count) % 10)
  if (count100 >= 10 && count100 <= 19) {
    return c
  }
  if (count10 === 1) {
    return a
  }
  if (count10 >= 2 && count10 <= 4) {
    return b
  }
  return c
}

export const getToValue = (fromCount, metersFrom, metersTo) => {
  const ratio = NP.divide(metersFrom, metersTo)
  const to = NP.times(ratio, fromCount)
  const strValue = Math.abs(to) > 1 ? to.toFixed(4) : to.toPrecision(3) 
  return parseFloat(strValue)
}