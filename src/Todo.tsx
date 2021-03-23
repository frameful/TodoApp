import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ITodo } from "./TodoPanel";

interface IProps {
  todo: ITodo;
  deleteTodo: Function;
  finishTodo: Function;
}

const Todo = ({ todo, deleteTodo, finishTodo }: IProps) => {
  return (
    <div className="flex w-full items-center bg-gray-100 h-10 mb-2">
      {/* {todo.finished ? (
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
      )} */}

      {todo.finished ? (
        <div className="h-full w-2 bg-green-500"></div>
      ) : (
        <div
          className="h-full w-2 bg-gray-200 cursor-pointer"
          onClick={() => {
            finishTodo(todo.title);
          }}
        ></div>
      )}

      <span className="ml-4">{todo.title}</span>
      <div className="flex-grow"></div>
      <FontAwesomeIcon
        className="cursor-pointer fill-current text-red-500 hover:text-red-600 mr-2"
        onClick={() => {
          deleteTodo(todo.title);
        }}
        icon={faTimes}
      />
    </div>
  );
};

export default Todo;
