import React from 'react'
import SearchPanel from './search-panel'
import { Row } from 'antd'
import List from './list'
import { useDebounce, useDocumentTitle } from 'utils'

import styled from '@emotion/styled'
import { useProjects } from './project'
import { useUsers } from './user'
import { useProjectModal, useProjectSearchParams } from './util'
import { ButtonNoPadding, ErrorBox } from 'components/lib'

export default function ProjectListScreen() {
  useDocumentTitle('项目列表', false)

  // 造成无限循环的原因是，数据变化会重新执行这个函数，然后useUrlQueryParam会创建一个新对象
  const [param, setParam] = useProjectSearchParams()

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  const { open } = useProjectModal()

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
      <ErrorBox error={error}></ErrorBox>
      <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false
const Container = styled.div`
  padding: 3.2rem;
`
