import React, { ReactNode } from 'react'

import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import { useQueryClient } from 'react-query'

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 去me接口获取值(用户信息)
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    error,
    isLoading,
    isError,
    isIdle,
    setData: setUser
  } = useAsync<User | null>()
  const queryClient = useQueryClient()
  const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then((user) => setUser(user))
  const logout = () =>
    auth.logout().then(() => {
      setUser(null)
      queryClient.clear()
    })

  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    ></AuthContext.Provider>
  )
}

export const useAuth = () => {
  // useContext返回的是距离最近的<MyContext.Provider> 的 value prop 决定
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
