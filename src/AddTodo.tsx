import React from "react";
import { useState } from "react";

interface IProps {
  addTodo: Function;
}

const AddTodo = ({ addTodo }: IProps) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleInput = (event: any) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event: any) => {
    event.preventDefault();
    addTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <div>
      <form action="" className="w-full mb-5">
        <div className="text-black flex items-center bg-white mb-4 border-black border">
          <label className="w-10 text-right mr-8 ml-2">Title:</label>
          <input
            className="flex-1 bg-transparent p-2 pl-0 outline-none"
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title"
            value={todoTitle}
            onChange={handleInput}
          ></input>
        </div>
        <button
          className="block focus:outline-none text-white w-full rounded bg-black p-2"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
