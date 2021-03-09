import React from "react";
import { useState } from "react";
import Todo from "./Todo";

export interface ITodo {
  title: String;
  finished: Boolean;
}

function TodoPanel() {
  const [todos, setTodos] = useState<ITodo[]>([
    { title: "test", finished: false },
  ]);

  const [input, setInput] = useState<string>("");

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const deleteTodo = (title: string) => {
    setTodos(todos.filter((todo) => todo.title !== title));
  };

  const addTodo = (event: any) => {
    event?.preventDefault();
    if (todos.some((item: ITodo) => item.title == input)) return;
    setTodos([...todos, { title: input, finished: false }]);
    setInput("");
  };

  const finishTodo = (title: string) => {
    setTodos(
      todos.map((item) =>
        item.title == title
          ? { title: item.title, finished: true }
          : { title: item.title, finished: item.finished }
      )
    );
  };

  return (
    <div className="flex items-center bg-image bg-cover justify-center h-screen">
      <div className="font-sans flex-col text-white flex items-center bg-indigo-400 bg-opacity-10 border shadow rounded-lg p-3 w-1/3 h-auto">
        <h1 className="p-5 text-lg font-bold">Todo App</h1>
        <form action="" className="w-3/4 mb-10">
          <div className="text-black flex items-center bg-white rounded-lg mb-2">
            <label className="w-10 text-right mr-8">Title:</label>
            <input
              className="flex-1 bg-transparent p-3 pl-0 outline-none"
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title"
              value={input}
              onChange={handleChange}
            ></input>
          </div>
          <button
            className="block focus:outline-none text-black w-full rounded bg-white p-2"
            onClick={addTodo}
          >
            Add
          </button>
        </form>
        {todos.length ? <div className="w-full bg-white h-1"></div> : null}
        <div className="flex flex-col divide-y w-full">
          {todos.map((item) => (
            <Todo
              todo={item}
              finishTodo={finishTodo}
              deleteTodo={deleteTodo}
            ></Todo>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoPanel;
