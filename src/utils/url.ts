import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/* 
返回页面url中指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line
      [searchParams] //只有当searchParams改变的时候才会进行该运算
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
    }
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
