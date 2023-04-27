import React from 'react'
import { Popover, Typography, List, Divider } from 'antd'
import { useProjects } from 'screens/project-list/project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'
export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const content = (
    <ContenContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      {props.projectButton}
    </ContenContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContenContainer = styled.div`
  min-width: 30rem;
`
