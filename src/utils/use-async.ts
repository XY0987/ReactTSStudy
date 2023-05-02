import { useCallback, useState, useReducer } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

// 看组件是否挂载完毕
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  // useMountedRef返回一个组件的挂载状态，挂载完毕之后返回true，如果卸载之后返回false
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0
    },
    [dispatch, mountedRef]
  )
}

export const useAsync = <D>(ininialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...ininialState
    }
  )
  const safeDispatch = useSafeDispatch(dispatch)
  // useState传入一个函数体的话会被直接执行一遍
  const [retry, setRetry] = useState(() => () => {})
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }),
    [safeDispatch]
  )
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null
      }),
    [safeDispatch]
  )

  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入promise类型数据')
      }
      // 把函数缓存下来
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      // 下边依赖中有state,这里又改变了state的值会陷入无限循环
      // setState({ ...state, stat: 'loading' })
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          if (config.throwOnError) {
            return Promise.reject(error)
          }
          return error
        })
    },
    [config.throwOnError, setData, setError, safeDispatch]
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry被调用时重新跑一遍run，让state重新刷新
    retry,
    ...state
  }
}
