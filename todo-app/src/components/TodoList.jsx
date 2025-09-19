import { TodoCard } from "./TodoCard";
import { useContext } from "react";
import { CurrentTabContext } from "../App";
import { TodosContext } from "../App";

export function TodoList({handleDeleteTodo, handleCompleteTodo}) {

    const { currentTab } = useContext(CurrentTabContext);
    const { todos } = useContext(TodosContext);

    const filteredTodosList = currentTab === 'All' ?
        todos :
        currentTab === 'Completed' ?
            todos.filter(val => val.completed) :
            todos.filter(val => !val.completed)

    return (
        <>
            {filteredTodosList.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        index={todoIndex}
                        todo={todo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCompleteTodo={handleCompleteTodo}
                    />
                )
            })}
        </>
    )
}