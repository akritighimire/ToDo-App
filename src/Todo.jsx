import React from "react";
import { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  // square bracket kina bhanda there are list of arrays

  const [inputValue, setInputValue] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        // yo chai unique id ko lagi
        text: inputValue,
      };

      setTodo([...todo, newTodo]);
      // yo chai new value input gare pachi already existing todo list ma add hune

      setInputValue("");
      // Add button click garepachi input empty hune
    }
  };

  const deleteTodo = (id) => {
    const updateTodos = todo.filter((todo) => todo.id !== id);
    setTodo(updateTodos);
  };

  const enterEditMode = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTodo = () => {
    const updatedTodos = todo.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });

    setTodo(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue("");
  };

  return (
    <>
      <div className="todo-container">
        <h2>TODO List</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // yeta ako value aba inputValue ma store bhako huncha
        />
        {editMode ? (
          <div>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />

            <button onClick={updateTodo}>Update</button>
          </div>
        ) : (
          <button onClick={addTodo}>Add</button>
        )}

        {/* <button onClick={addTodo}>Add</button> */}
        <ul>
          {todo.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <div>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
                <button
                  className="edit"
                  onClick={() => enterEditMode(todo.id, todo.text)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
