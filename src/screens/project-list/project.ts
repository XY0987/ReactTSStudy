import { useEffect } from 'react'
import { useAsync } from 'utils/use-async'
import { Project } from './list'

import { useHttp } from 'utils/http'

import { cleanObject } from 'utils'

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()

  //   当param的值改变的时候会执行这个函数
  useEffect(() => {
    const fetchProjects = () =>
      client('projects', {
        data: cleanObject(param || {})
      })
    // 开始就执行了一遍run
    run(fetchProjects(), {
      retry: fetchProjects
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }
  return { mutate, ...asyncResult }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()

  const mutate = (params: Partial<Project>) => {
    const fetchProjects = () =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    return run(fetchProjects(), {
      retry: fetchProjects
    })
  }
  return { mutate, ...asyncResult }
}
