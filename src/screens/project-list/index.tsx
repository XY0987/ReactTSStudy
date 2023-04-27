import React from 'react'
import SearchPanel from './search-panel'
import { Typography } from 'antd'
import List from './list'
import { useDebounce, useDocumentTitle } from 'utils'

import styled from '@emotion/styled'
import { useProjects } from './project'
import { useUsers } from './user'
import { useProjectSearchParams } from './util'

export default function ProjectListScreen() {
  useDocumentTitle('项目列表', false)

  // 造成无限循环的原因是，数据变化会重新执行这个函数，然后useUrlQueryParam会创建一个新对象
  const [param, setParam] = useProjectSearchParams()

  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false
const Container = styled.div`
  padding: 3.2rem;
`
