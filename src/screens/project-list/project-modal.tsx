import React, { useEffect } from 'react'
import { Drawer, Button, Spin, Form, Input } from 'antd'
import { useProjectModal, useProjectsQueryKey } from './util'
import { UserSelect } from 'components/user-select'
import { useAddProject, useEditProject } from './project'
import { useForm } from 'antd/es/form/Form'
import { ErrorBox } from 'components/lib'
import styled from '@emotion/styled'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()

  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  const title = editingProject ? '编辑项目' : '创建项目'

  return (
    <Drawer forceRender={true} onClose={closeModal} open={projectModalOpen} width={'100%'}>
      <Container>
        {isLoading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error}></ErrorBox>
            <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item
                label="名称"
                name={'name'}
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder="请输入项目名称"></Input>
              </Form.Item>
              <Form.Item
                label="部门"
                name={'organization'}
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder="请输入部门名称"></Input>
              </Form.Item>
              <Form.Item label="负责人" name={'personId'}>
                <UserSelect defaultOptionName="负责人"></UserSelect>
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" loading={mutateLoading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
