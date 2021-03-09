import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ITodo } from "./TodoPanel";

interface IProps {
  todo: ITodo;
  deleteTodo: Function;
  finishTodo: Function;
}

const Todo = ({ todo, deleteTodo, finishTodo }: IProps) => {
  return (
    <div className="flex w-full items-center p-5">
      {todo.finished ? (
        <FontAwesomeIcon
          className="fill-current text-green-300 cursor-pointer mr-3"
          icon={faCheck}
        />
      ) : (
        <FontAwesomeIcon
          className="fill-current text-white hover:text-blue-200 cursor-pointer mr-3"
          onClick={() => {
            finishTodo(todo.title);
          }}
          icon={faCheck}
        />
      )}

      <span className="">{todo.title}</span>
      <div className="flex-grow"></div>
      <FontAwesomeIcon
        className="cursor-pointer fill-current text-red-300 hover:text-red-400"
        onClick={() => {
          deleteTodo(todo.title);
        }}
        icon={faTrashAlt}
      />
    </div>
  );
};

export default Todo;
