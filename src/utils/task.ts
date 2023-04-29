import { useHttp } from 'utils/http'

import { QueryKey, useMutation, useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { Task } from 'types/task'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // 传递两个参数第一个表示缓存的名字，第二个表示要监视的对象(param改变的时候会自动执行该函数)
  return useQuery<Task[], Error>(['tasks', param], () => {
    return client('tasks', { data: cleanObject(param || {}) })
  })
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  // 限制当id是undefined的时候不执行该函数
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), { enabled: !!id })
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
