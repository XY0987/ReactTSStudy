import React from 'react'
import { useAuth } from 'context/auth-context'

import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth()
  console.log(user)

  const { run, isLoading } = useAsync()

  const handleSubmit = (values: { username: string; password: string }) => {
    // 阻止表单提交的默认行为
    run(login(values).catch(onError))
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input type="text" placeholder="用户名" id={'username'} autoComplete="off" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" id={'userpassword'} placeholder="密码" autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={'primary'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
