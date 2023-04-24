import React from 'react'

import { useState, useEffect } from 'react'
import SearchPanel from './search-panel'
import List from './list'
import { cleanObject, useDebounce, useMount } from 'utils'

import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export default function ProjectListScreen() {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  const debouncedParam = useDebounce(param, 2000)

  //   当param的值改变的时候会执行这个函数
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json())
        }
      }
    )
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
