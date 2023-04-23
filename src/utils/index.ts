import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value) //两个!表示将一个值转化为布尔值

// 在一个函数里边改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function () {
//       func(...param)
//     }, delay)
//   }
// }

export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debounceValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后设置一个定时器
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 每次在上一个useEffect处理完以后再运行(这里返回的一个函数会执行当前 effect 之前对上一个 effect 进行清除)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

export const useArray = <T>(arr: T[]) => {
  const [value, setValue] = useState(arr)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.slice(index, 1)
      setValue([...copy])
    },
    clear: () => setValue([])
  }
}
