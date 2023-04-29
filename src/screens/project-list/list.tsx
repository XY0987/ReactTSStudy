import React from 'react'

import { Modal, Table, TableProps } from 'antd'

import { User } from './search-panel'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from './project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectsQueryKey } from './util'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
          }
        },
        {
          title: '名称',
          //按字母顺序排序
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>
          }
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
        },
        {
          title: '操作框',
          render(value, project) {
            return <More project={project}></More>
          }
        }
      ]}
      {...props}
    ></Table>
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (project: Project) => {
    Modal.confirm({
      title: '确定删除这个项目吗',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject(project)
      }
    })
  }
  return (
    <div>
      <ButtonNoPadding type="link" onClick={editProject(project.id)}>
        编辑
      </ButtonNoPadding>
      <ButtonNoPadding type="link" onClick={() => confirmDeleteProject(project)}>
        删除
      </ButtonNoPadding>
    </div>
  )
}
