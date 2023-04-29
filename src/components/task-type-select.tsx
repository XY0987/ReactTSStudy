import React from 'react'
import { IdSellect } from './id-select'
import { useTaskTypes } from 'utils/task-type'
export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSellect>) => {
  const { data: Tasks } = useTaskTypes()
  return <IdSellect options={Tasks || []} {...props}></IdSellect>
}
