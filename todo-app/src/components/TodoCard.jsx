export function TodoCard({ index, todo, handleDeleteTodo, handleCompleteTodo }) {

    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button disabled={todo.completed} onClick={() => handleCompleteTodo(index)}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(index);
                }}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}