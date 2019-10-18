/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-10-06 14:55:58
 * @LastEditors: anan
 * @LastEditTime: 2019-10-06 14:57:54
 */
// 数组去重
export function distinct(a) {
  const arr = a
  const result = []
  const obj = {}
  for (const i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}

// 两数组合并 再 去重
export function distincts(a, b) {
  const arr = a.concat(b)
  const result = []
  const obj = {}
  for (const i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}
