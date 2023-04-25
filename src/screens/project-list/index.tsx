import React from 'react'

import { useState, useEffect } from 'react'
import SearchPanel from './search-panel'
import { Typography } from 'antd'
import List from './list'
import { cleanObject, useDebounce, useMount } from 'utils'

import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export default function ProjectListScreen() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  const client = useHttp()

  const debouncedParam = useDebounce(param, 2000)

  //   当param的值改变的时候会执行这个函数
  useEffect(() => {
    setIsLoading(true)
    client('projects', {
      data: cleanObject(debouncedParam)
    })
      .then(setList)
      .catch((error) => {
        setList([])
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list}></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
