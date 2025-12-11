import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/storage";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const [filter, setFilter] = useState("all");

  // search query for filtering todos by text
  const [query, setQuery] = useState("");

  // persist todos whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text, dueDate) => {
    // use the browser's crypto API to generate a UUID (no external dependency)
    const newTodo = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      text,
      completed: false,
      dueDate: dueDate || null,
    };
    setTodos((t) => [newTodo, ...t]);
  };

  const toggleTodo = (id) => {
    setTodos((t) =>
      t.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  };

  // first apply status filter, then text search (case-insensitive)
  const filteredByStatus = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      case "all":
      default:
        return true;
    }
  });

  const filtered = filteredByStatus.filter((todo) =>
    todo.text.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="app">
      <h1 className="app-title">NovaTasks</h1>
      <TodoForm onAdd={addTodo} />

      <div className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索..."
          aria-label="検索"
        />
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />

      <footer className="footer">
        <small>
          {todos.length} items total |{" "}
          {todos.filter((todo) => !todo.completed).length} active |{" "}
          {todos.filter((todo) => todo.completed).length} completed
        </small>
      </footer>
    </div>
  );
}
