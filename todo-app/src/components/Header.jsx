import { TodosContext } from "../App";
import { useContext } from "react";

export function Header() {

    const { todos } = useContext(TodosContext);

    const currOpen = todos.filter((val) => {
        return val['completed'] == false;
    })
    const numTodos = currOpen.length;
    const isTaskPlural = numTodos != 1 ? 'tasks' : 'task';
    return (
        <header>
            <h1>You have {numTodos} open {isTaskPlural}</h1>
        </header>
    )
}