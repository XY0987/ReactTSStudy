import { useHttp } from 'utils/http'

import { useQuery } from 'react-query'
import { cleanObject } from 'utils'
import { kanban } from 'types/kanban'

export const useKanbans = (param?: Partial<kanban>) => {
  const client = useHttp()
  // 传递两个参数第一个表示缓存的名字，第二个表示要监视的对象(param改变的时候会自动执行该函数)
  return useQuery<kanban[], Error>(['kanbans', param], () => {
    return client('kanbans', { data: cleanObject(param || {}) })
  })
}
