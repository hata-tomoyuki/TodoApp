import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), dueDate);
    setText("");
    setDueDate("");
  };

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいTodo"
        aria-label="新しいTodo"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="期限日"
      />
      <button type="submit">追加</button>
    </form>
  );
}
