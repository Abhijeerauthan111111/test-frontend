import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import {useRef, useContext} from "react";

const AddTodo = () => {

  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const {addTodoItem} = useContext(TodoItemsContext);

  const addHandler = () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;
    todoTextInput.current.value = '';
    todoDateInput.current.value = '';
    fetch("https://roomrental-backend.azurewebsites.net/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate
      })
    }).then(res => res.json())
    .then(serverItem => {
      const {id, todoText, todoDate} = todoItemToClientModel(serverItem);
      addTodoItem(id, todoText, todoDate);
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-12">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-gray-200 font-semibold mb-4">Add New Task</h2>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-gray-100 placeholder-gray-500 transition-all duration-300"
              placeholder="What needs to be done?"
              ref={todoTextInput}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <input 
                type="date" 
                ref={todoDateInput} 
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-gray-100 transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <button
              onClick={addHandler}
              className="px-6 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500/50 active:scale-95"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
