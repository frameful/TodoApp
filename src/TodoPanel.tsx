import React from "react";
import { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

export interface ITodo {
  title: String;
  finished: Boolean;
}

function TodoPanel() {
  const [todos, setTodos] = useState<ITodo[]>([
    { title: "test", finished: false },
  ]);

  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const [hideFinished, setHideFinished] = useState<boolean>(false);

  const toggleHideFinished = () => {
    setHideFinished(!hideFinished);
  };

  const toggleShowAddTodo = () => {
    setShowAddTodo(!showAddTodo);
  };

  const deleteTodo = (title: string) => {
    setTodos(todos.filter((todo) => todo.title !== title));
  };

  const addTodo = (title: string) => {
    if (todos.some((item: ITodo) => item.title == title) || !title) return;
    setTodos([...todos, { title: title, finished: false }]);
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
    <div className="flex items-center bg-white justify-center h-screen">
      <div className="font-mono flex-col text-black flex items-center bg-white bg-opacity-10 border-black border shadow p-3 w-1/4 h-auto max-h-2/3">
        <div className="w-full p-5">
          <div className="w-full bg-black h-px"></div>
          <div className="w-full flex items-center">
            <h1 className="inline-block p-5 text-lg font-bold">Todo App</h1>
            <div className="flex-grow"></div>
            {showAddTodo ? (
              <button
                className="focus:outline-none w-1/4 rounded bg-white text-black bg-opacity-20 p-1 border-black border"
                onClick={toggleShowAddTodo}
              >
                Add
              </button>
            ) : (
              <button
                className="focus:outline-none text-white w-1/4 rounded bg-black p-1"
                onClick={toggleShowAddTodo}
              >
                Add
              </button>
            )}
          </div>
          {showAddTodo ? <AddTodo addTodo={addTodo} /> : null}

          {todos.length ? (
            <div className="w-full bg-black h-px mb-5"></div>
          ) : null}
          <div className="flex flex-col divide-y w-full overflow-y-scroll max-h-300px mb-5">
            {todos.map((item) =>
              hideFinished ? (
                !item.finished ? (
                  <Todo
                    todo={item}
                    finishTodo={finishTodo}
                    deleteTodo={deleteTodo}
                  ></Todo>
                ) : null
              ) : (
                <Todo
                  todo={item}
                  finishTodo={finishTodo}
                  deleteTodo={deleteTodo}
                ></Todo>
              )
            )}
          </div>
          <div className="w-full bg-black h-px"></div>
        </div>
        <div className="flex flex-col items-center pb-2">
          <span>Copyright © 2021</span>
          <a href="" target="none">
            About
          </a>
        </div>
      </div>
    </div>
  );
}

export default TodoPanel;
