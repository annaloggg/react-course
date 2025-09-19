import { useState } from 'react';

export function TodoInput({ handleAddTodo }) {

    const [inputValue, setInputValue] = useState('');

    return (
        <div className="input-container">
            <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e)=> {
                    if (e.code == 'Enter' && inputValue) {
                        handleAddTodo(inputValue);
                        setInputValue('');
                    }
                }}
                placeholder="Add task" />
            <button onClick={() => {
                if (!inputValue) { return;}
                handleAddTodo(inputValue);
                setInputValue('');
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>

        </div>
    )
}