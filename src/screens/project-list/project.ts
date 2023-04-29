import { Project } from './list'

import { useHttp } from 'utils/http'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { cleanObject } from 'utils'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // 传递两个参数第一个表示缓存的名字，第二个表示要监视的对象(param改变的时候会自动执行该函数)
  return useQuery<Project[], Error>(['projects', param], () => {
    return client('projects', { data: cleanObject(param || {}) })
  })

  // const { run, ...result } = useAsync<Project[]>()
  // const fetchProjects = useCallback(
  //   () =>
  //     client('projects', {
  //       data: cleanObject(param || {})
  //     }),
  //   [client, param]
  // )
  // //   当param的值改变的时候会执行这个函数
  // useEffect(() => {
  //   // 开始就执行了一遍run
  //   run(fetchProjects(), {
  //     retry: fetchProjects
  //   })
  // }, [param, run, fetchProjects])
  // return result
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )

  // const { run, ...asyncResult } = useAsync()
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'PATCH'
  //     })
  //   )
  // }
  // return { mutate, ...asyncResult }
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
  // const { run, ...asyncResult } = useAsync()
  // const mutate = (params: Partial<Project>) => {
  //   const fetchProjects = () =>
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'POST'
  //     })
  //   return run(fetchProjects(), {
  //     retry: fetchProjects
  //   })
  // }
  // return { mutate, ...asyncResult }
}

export const useProject = (id?: number) => {
  const client = useHttp()
  // 限制当id是undefined的时候不执行该函数
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), { enabled: !!id })
}
