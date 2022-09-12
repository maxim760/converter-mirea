export const getReadableCaption = (count, [a, b, c]) => {
  const count100 = Math.floor(Math.abs(count) % 100)
  const count10 = Math.floor(Math.abs(count) % 10)
  if (count10 === 1 && count100 !== 11) {
    return a
  }
  if (count10 >= 2 && count10 <= 4) {
    return b
  }
  return c
}

export const getToValue = (fromCount, metersFrom, metersTo) => {
  const ratio = metersFrom / metersTo
  const to = ratio * fromCount
  return to
}