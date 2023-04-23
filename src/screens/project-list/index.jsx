import React from 'react'

import { useState, useEffect } from 'react'
import SearchPanel from './search-panel'
import List from './list'
import { cleanObject } from 'utils'

import * as qs from 'qs'

const apiUrl = 'http://localhost:3001'

export default function ProjectListScreen() {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  //   当param的值改变的时候会执行这个函数
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
