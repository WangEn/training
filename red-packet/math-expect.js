/**
 * 数学期望法解析
 * @param {*} amount 
 * @param {*} number 
 */
function randomBonus (amount, number) {
  const result = []
  if (number > amount * 100) {
    console.log('The amount is less.')
    return
  }
  const tempAmount = amount * 100
  let leftAmount = tempAmount
  while (number >= 1) {
    if (number === 1) {
      result.push((leftAmount / 100).toFixed(2))
      break
    }
    const randomAmount = Math.floor(Math.random() * (leftAmount / number * 2))
    result.push((randomAmount / 100).toFixed(2))
    leftAmount -= randomAmount
    number--
  }
  return result
}

console.time('randomBonus')
console.log(randomBonus(100, 3))
console.timeEnd('randomBonus')

