import { useContext } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { useEffect } from "react";
import { useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https:/roomrental-backend.azurewebsites.net/todos`)

      .then((res) => res.json())
      .then((items) => {
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-pink-500/20 border-t-pink-500 animate-spin"></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-6 rounded-full bg-gray-800/50 backdrop-blur-lg mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <p className="text-gray-300 text-lg font-medium">No tasks yet!</p>
          <p className="text-gray-500 mt-2">Start fresh by adding a new task above</p>
        </div>
      )}
    </>
  );
};

export default LoadItems;
