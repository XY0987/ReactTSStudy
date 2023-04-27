import { useAuth } from 'context/auth-context'
import React from 'react'
import ProjectListScreen from 'screens/project-list'

import styled from '@emotion/styled'
import { Row } from 'components/lib'

import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

import { Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'

import { Routes, Route, Navigate } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />}></Route>
          <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
          <Route index element={<Navigate to={'projects'} replace={true} />}></Route>
        </Routes>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={logout}>
          登出
        </Button>
      )
    }
  ]
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color="rgb(38,132,255)"></SoftwareLogo>
        </Button>
        <HeaderItem>项目</HeaderItem>
        <HeaderItem>用户</HeaderItem>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const HeaderItem = styled.h3`
  margin-right: 3rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
