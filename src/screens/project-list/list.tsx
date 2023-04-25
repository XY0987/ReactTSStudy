import React from 'react'

import { Table } from 'antd'

import { User } from './search-panel'
import dayjs from 'dayjs'

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
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
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || '未作'}</span>
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
            )
          }
        }
      ]}
      dataSource={list}
    ></Table>
  )
}
