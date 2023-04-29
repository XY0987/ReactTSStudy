import { useHttp } from 'utils/http'

import { QueryKey, useMutation, useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { kanban } from 'types/kanban'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useKanbans = (param?: Partial<kanban>) => {
  const client = useHttp()
  // 传递两个参数第一个表示缓存的名字，第二个表示要监视的对象(param改变的时候会自动执行该函数)
  return useQuery<kanban[], Error>(['kanbans', param], () => {
    return client('kanbans', { data: cleanObject(param || {}) })
  })
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
