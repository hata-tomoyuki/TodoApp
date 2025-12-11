import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    
    const isOverdue = dueDate < today && !todo.completed;
    
    return (
      <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
        期限: {date.toLocaleDateString("ja-JP")}
      </span>
    );
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-content">
          <span className="text">{todo.text}</span>
          {todo.dueDate && formatDueDate(todo.dueDate)}
        </span>
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
