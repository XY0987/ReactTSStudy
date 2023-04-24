import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'

export const RegisterScreen = () => {
  const { register, user } = useAuth()
  console.log(user)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单提交的默认行为
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    register({ username, password })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" placeholder="请输入用户名" id={'username'} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'userpassword'} placeholder="请输入密码" autoComplete="off" />
      </div>
      <button type={'submit'}>注册</button>
    </form>
  )
}
