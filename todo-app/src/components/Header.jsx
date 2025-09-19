export function Header({todos}) {

    const numTodos = todos.length;
    const isTaskPlural = numTodos != 1 ? 'tasks' : 'task';
    return (
        <header>
            <h1>You have {numTodos} open {isTaskPlural}</h1>
        </header>
    )
}