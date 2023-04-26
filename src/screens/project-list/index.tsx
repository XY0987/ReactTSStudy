import React from 'react'

import { useState } from 'react'
import SearchPanel from './search-panel'
import { Typography } from 'antd'
import List from './list'
import { useDebounce, useDocumentTitle } from 'utils'

import styled from '@emotion/styled'
import { useProjects } from './project'
import { useUsers } from './user'

export default function ProjectListScreen() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, error, data: list } = useProjects(debouncedParam)

  const { data: users } = useUsers()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
