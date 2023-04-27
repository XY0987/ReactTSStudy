import React from 'react'
import { useUsers } from 'screens/project-list/user'
import { IdSellect } from './id-select'
export const UserSelect = (props: React.ComponentProps<typeof IdSellect>) => {
  const { data: users } = useUsers()
  return <IdSellect options={users || []} {...props}></IdSellect>
}
