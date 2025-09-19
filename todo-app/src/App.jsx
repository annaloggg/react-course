import { useState } from 'react'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'

function App() {

  const todos = [
    {input: 'Hello! Add your first todo:)', complete: true},
    {input: 'Learn to code React', complete: false},
    {input: 'Apply to one billion jobs', complete: false},
    {input: 'Get interview', complete: false},
    {input: 'Get hired', complete: false},
  ]

  return (
    <>
      <Header todos={todos}/>
      <Tabs todos={todos}/>
      <TodoList todos={todos}/>
      <TodoInput todos={todos}/>
    </>
  )
}

export default App
