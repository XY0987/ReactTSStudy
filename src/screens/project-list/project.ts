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
    // 开始就执行了一遍run
    run(
      client('projects', {
        data: cleanObject(param || {})
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}
