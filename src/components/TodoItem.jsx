import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="text">{todo.text}</span>
      </label>
      <button
        className="delete"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
      >
        削除
      </button>
    </li>
  );
}
