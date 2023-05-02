import { QueryKey, useQueryClient } from 'react-query'

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
    // onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 会把我们传入的参数自动传入到这个函数里边
    async onMutate(target: any) {
      // 一发生该函数就立即被调用
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      // 返回原数据用于错误的时候回滚
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      // 发生错误，回滚到原数据(原数据在onMutate被返回了，存放在context中)
      queryClient.setQueryData(queryKey, context?.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || [])

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || []
  )

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []))
