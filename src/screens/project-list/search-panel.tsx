import React from 'react'

import { Input, Form } from 'antd'
import { Project } from 'types/project'

import { UserSelect } from 'components/user-select'

import { User } from 'types/user'

interface SearchPanel {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanel['param']) => void
}

// 结构赋值
export default function searchPanel({ users, param, setParam }: SearchPanel) {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}
