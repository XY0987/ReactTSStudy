import React from 'react'
import './App.css'
import { useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
// import ProjectListScreen from 'screens/project-list/index'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {user ? <AuthenticatedApp></AuthenticatedApp> : <UnauthenticatedApp></UnauthenticatedApp>}
    </div>
  )
}

export default App
