export const isFalsy = (value) => (value === 0 ? false : !value) //两个!表示将一个值转化为布尔值

// 在一个函数里边改变传入的对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
