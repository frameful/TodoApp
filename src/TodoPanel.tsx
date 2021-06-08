import React from "react";
import { useState, Fragment, useEffect } from "react";
import Todo from "./Todo";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export interface ITodo {
  title: string;
  finished: boolean;
  dateAdded: Date;
}

interface ISortOption {
  id: number;
  sort: (first: ITodo, second: ITodo) => number;
  name: string;
}

const sortOptions: ISortOption[] = [
  {
    id: 1,
    sort: (first: ITodo, second: ITodo) => {
      if (first.dateAdded > second.dateAdded) return 1;
      if (first.dateAdded < second.dateAdded) return -1;
      return 0;
    },
    name: "Date",
  },
  {
    id: 2,
    sort: (first: ITodo, second: ITodo) => {
      if (first.title > second.title) return 1;
      if (first.title < second.title) return -1;
      return 0;
    },
    name: "Title",
  },
];

const TodoPanel = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    { title: "test", finished: false, dateAdded: new Date() },
  ]);

  const [selectedSortOption, setSelectedSortOption] = useState<ISortOption>(
    sortOptions[0]
  );

  const [input, setInput] = useState<string>("");

  const [hideFinished, setHideFinished] = useState<boolean>(false);

  useEffect(() => {
    setTodos([...todos].sort(selectedSortOption.sort));
  }, [selectedSortOption]);

  const toggleHideFinished = () => {
    setHideFinished(!hideFinished);
  };

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  const deleteTodo = (title: string) => {
    setTodos(todos.filter((todo) => todo.title !== title));
  };

  const addTodo = (event: any) => {
    event?.preventDefault();
    if (todos.some((item: ITodo) => item.title == input) || !input) return;
    setTodos(
      [...todos, { title: input, finished: false, dateAdded: new Date() }].sort(
        selectedSortOption.sort
      )
    );
    setInput("");
  };

  const finishTodo = (title: string) => {
    setTodos(
      todos.map((item: ITodo) =>
        item.title == title
          ? { title: item.title, finished: true, dateAdded: item.dateAdded }
          : item
      )
    );
  };

  return (
    <div className="flex items-center bg-image bg-cover justify-center h-screen">
      <div className="font-sans text-white flex-col flex items-center bg-indigo-400 bg-opacity-10 border shadow rounded-lg p-3 w-1/3 h-auto max-h-2/3">
        <h1 className="p-5 text-lg font-bold">Todo App</h1>
        <form action="" className="w-3/4 mb-5">
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
        {hideFinished ? (
          <button
            className="block focus:outline-none text-black w-3/4 rounded bg-blue-200 text-white bg-opacity-20 p-2"
            onClick={toggleHideFinished}
          >
            Hide Finished
          </button>
        ) : (
          <button
            className="block focus:outline-none text-black w-3/4 rounded bg-white p-2"
            onClick={toggleHideFinished}
          >
            Hide Finished
          </button>
        )}

        <div className="w-80 p-1">
          <Listbox value={selectedSortOption} onChange={setSelectedSortOption}>
            <div className="flex flex-row items-center">
              <Listbox.Label className="text-white p-2">Sort by:</Listbox.Label>
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-black text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {selectedSortOption.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-80 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortOptions.map((item: ISortOption) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `${active ? "text-black bg-gray-100" : "text-gray-900"}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    key={item.id}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
        {todos.length ? <div className="w-full bg-white h-1"></div> : null}
        <div className="flex flex-col divide-y w-full  overflow-y-scroll">
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
      </div>
    </div>
  );
};

export default TodoPanel;
