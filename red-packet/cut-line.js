/**
 * 线段切割法实现
 * @param {number} amount 红包总额
 * @param {number} number 随机红包个数
 * @returns {Array} 红包金额数组
 */
function provide (amount, number) {
  const tempAmount = amount * 100
  const lineArr = [0]
  const result = []
  while (number > 1) {
    const randomAmount = Math.floor(Math.random() * tempAmount)
    if (lineArr.indexOf(randomAmount) === -1) {
      lineArr.push(randomAmount)
      number--
    }
  }
  lineArr.push(tempAmount)
  lineArr.sort((a, b) => a - b)
  console.log(lineArr);

  for (let i = 0; i < lineArr.length - 1; i++) {
    const cash = ((lineArr[i + 1] - lineArr[i]) / 100).toFixed(2)
    result.push(cash)
  }
  return result
}
console.time('provide')
console.log(provide(200, 5))
console.timeEnd('provide')
