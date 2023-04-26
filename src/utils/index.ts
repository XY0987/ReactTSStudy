import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value) //两个!表示将一个值转化为布尔值

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里边改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    // 如果使用isFalsy无法避免值为false被删除的情况
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // 依赖项里边加入callback会造成无限循环
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])
  // 返回一个函数会再页面卸载的时候被调用
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 这里如果不指定依赖读取到的就是旧title
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, title])
}
