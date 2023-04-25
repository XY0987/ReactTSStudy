import React from 'react'

import { Table } from 'antd'

import { User } from './search-panel'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
}

interface ListProps {
  list: Project[]
  users: User[]
}

export default function list({ list, users }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name) //按字母顺序排序
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || '未作'}</span>
          }
        }
      ]}
      dataSource={list}
    ></Table>
  )
}
