import { useHttp } from 'utils/http'

import { useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { Task } from 'types/task'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // 传递两个参数第一个表示缓存的名字，第二个表示要监视的对象(param改变的时候会自动执行该函数)
  return useQuery<Task[], Error>(['tasks', param], () => {
    return client('tasks', { data: cleanObject(param || {}) })
  })
}
