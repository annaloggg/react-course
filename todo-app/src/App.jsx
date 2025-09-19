import { createContext, useState } from 'react'
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoList } from './components/TodoList'
import { TodoInput } from './components/TodoInput'

export const CurrentTabContext = createContext(null);
export const TodosContext = createContext([]);

export default function App() {

  const firstTodo = { input: 'Hello! Add your first todo:)', completed: true }
  const [todos, setTodos] = useState([firstTodo]);

  const [currentTab, setCurrentTab] = useState('All');

  function handleAddTodo(newTodo) {
    setTodos([
      ...todos,
      {
        input: newTodo,
        completed: false
      }
    ]);
  }

  function handleCompleteTodo(index) {
    console.log(index);
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['completed'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index;
    });

    setTodos(newTodoList);

  }

  return (
    <>
      <TodosContext
        value={{ todos, setTodos }}>
        <Header todos={todos} />
        <CurrentTabContext
          value={{ currentTab, setCurrentTab }}>
          <Tabs todos={todos} />
          <TodoList
            todos={todos}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
          />
        </CurrentTabContext>
        <TodoInput handleAddTodo={handleAddTodo} />
      </TodosContext>
    </>
  )
}
