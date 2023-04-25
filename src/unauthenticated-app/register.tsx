import React from 'react'
import { useAuth } from 'context/auth-context'

import { Form, Input, Button } from 'antd'

export const RegisterScreen = () => {
  const { register, user } = useAuth()
  console.log(user)

  const handleSubmit = (values: { username: string; password: string }) => {
    // 阻止表单提交的默认行为
    register(values)
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
        <Button htmlType="submit" type={'primary'}>
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
