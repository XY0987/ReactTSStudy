import React from 'react'
import { kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './util'
import { useTaskTypes } from 'utils/task-type'
import styled from '@emotion/styled'
import { Button, Card, Modal } from 'antd'
import { CreateTask } from './create-task'
import { Task } from 'types/task'
import { Mark } from 'components/mark'
import { useDeleteKanban } from 'utils/kanban'
import { Row } from 'components/lib'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return name === 'task' ? <span>₍ᐢ..ᐢ₎♡</span> : <span>•ࡇ•</span>
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <Mark keyword={keyword} name={task.name}></Mark>
      <TaskTypeIcon id={task.id}></TaskTypeIcon>
    </Card>
  )
}

export const KanbanColumn = ({ kanban }: { kanban: kanban }) => {
  const { data: AllTasks } = useTasks()
  const tasks = AllTasks?.filter((task) => task.kanbanId === kanban.id)
  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban}></More>
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task}></TaskCard>
        ))}
        <CreateTask kanbanId={kanban.id}></CreateTask>
      </TasksContainer>
    </Container>
  )
}

const More = ({ kanban }: { kanban: kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return mutateAsync({ id: kanban.id })
      }
    })
  }
  return (
    <Button onClick={startEdit} type="link">
      删除
    </Button>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 3rem;
  width: 100%;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
