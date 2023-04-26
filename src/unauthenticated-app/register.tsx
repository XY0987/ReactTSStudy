import React from 'react'
import { useAuth } from 'context/auth-context'

import { Form, Input } from 'antd'

import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth()
  console.log(user)

  const { run, isLoading } = useAsync()

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    // 阻止表单提交的默认行为
    run(register(values).catch(onError))
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" placeholder="用户名" id={'username'} autoComplete="off" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'userpassword'} placeholder="密码" autoComplete="off" />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
        <Input type="password" id={'cpassword'} placeholder="确认密码" autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={'primary'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
