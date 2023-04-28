import { useAuth } from 'context/auth-context'
import React from 'react'
import ProjectListScreen from 'screens/project-list'

import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'

import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

import { Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'

import { Routes, Route, Navigate } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'

import { ProjectModal } from 'screens/project-list/project-modal'

import { ProjectPopover } from 'components/project-popover'

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
      <ProjectModal></ProjectModal>
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color="rgb(38,132,255)"></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  )
}

const User = () => {
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
    <Dropdown menu={{ items }}>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  )
}

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
