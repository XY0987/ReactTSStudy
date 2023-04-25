import { useAuth } from 'context/auth-context'
import React from 'react'
import ProjectListScreen from 'screens/project-list'

import styled from '@emotion/styled'
import { Row } from 'components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <HeaderItem>logo</HeaderItem>
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
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

const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
