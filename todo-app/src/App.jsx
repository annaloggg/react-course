import { createContext, useState, useEffect } from 'react'
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
    handleSaveData(todos)
  }

  function handleCompleteTodo(index) {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['completed'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index;
    });

    setTodos(newTodoList);
    handleSaveData(newTodoList);

  }

  function handleSaveData(currentTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos }));
  }

  // empty dependency array tells us to run as soon as webpage is avaiable
  // i.e. mimics componentDidMount
  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return; }
    const db = JSON.parse(localStorage.getItem('todo-app'));
    setTodos(Array.from(db.todos));
  }, [])

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
