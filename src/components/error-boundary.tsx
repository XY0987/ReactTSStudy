import React, { ReactNode } from 'react'
type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// 接收两个泛型参数(第一个是指定prop，第二个是指定state)
// { children: ReactNode, fallbackRender: FallbackRender }第一个泛型的参数相当于这个
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }
  // 当子组件抛出异常，这里会接收到并调用该函数，state里边的error会变成返回的error
  static getDervedStateFromError(error: Error) {
    return { error }
  }
  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
