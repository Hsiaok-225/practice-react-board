import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

let id = 1;

function Savelocalstorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function App() {
  const [todos, setTodos] = useState(() => {
    // initailizer
    let todoData = localStorage.getItem("todos" || "");
    if (todoData) {
      todoData = JSON.parse(todoData);
      if (todoData[0]) {
        id = todoData[0].id + 1;
      }
    } else {
      todoData = [];
    }
    return todoData;
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    Savelocalstorage(todos);
  }, [todos]);

  const handleButtonClick = () => {
    setTodos([
      {
        id,
        content: value,
      },
      ...todos,
    ]);
    setValue("");
    id++;
  };

  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id)
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="here~"
        value={value}
        onChange={handleInputValue}
      />
      <button onClick={handleButtonClick}>新增</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
