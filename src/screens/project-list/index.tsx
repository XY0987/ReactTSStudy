import React from 'react'

import { useState, useEffect } from 'react'
import SearchPanel from './search-panel'
import List from './list'
import { cleanObject, useDebounce, useMount } from 'utils'

import { useHttp } from 'utils/http'

export default function ProjectListScreen() {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  const client = useHttp()

  const debouncedParam = useDebounce(param, 2000)

  //   当param的值改变的时候会执行这个函数
  useEffect(() => {
    client('projects', {
      data: cleanObject(debouncedParam)
    }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
