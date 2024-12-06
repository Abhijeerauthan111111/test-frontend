import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import {useContext, useState} from "react";

const TodoItem = ({ id, todoText, todoDate, completed, createdate}) => {

  // const formatteddate = new Date(todoDate).toLocaleDateString('en-IN',{
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric"
  // })

  function formatdate(date){
    const formatteddate = new Date(date).toLocaleDateString('en-IN',{
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    return formatteddate;
    }

  const {deleteTodoItem} = useContext(TodoItemsContext);
  
  const [iscomplete, setiscomplete] = useState(completed)

  const toggle = ()=>{
    fetch(`https://roomrental-backend.azurewebsites.net/todos/${id}`, {
      method: 'PATCH',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify({completed : !iscomplete})

    })
    .then(res => res.json())
    .then(updateditem => {
      console.log("updateditem ",updateditem)
      const clientupdateditem = todoItemToClientModel(updateditem);
      setiscomplete(clientupdateditem.completed)
    })  
    .catch(err => {
      console.log(err);
    })
    
  } 

  const deleteHandler = () => {
   
    fetch(`https://roomrental-backend.azurewebsites.net/todos/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(deleteditem => {
      const clientdeleteditem = todoItemToClientModel(deleteditem);

      deleteTodoItem(clientdeleteditem.id);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-3 group">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        <div className="p-4 flex items-center gap-4">

          {/* Check box */}
          <input 
            type="checkbox" 
            
            className="w-4 h-4 rounded border-gray-500 text-violet-500 hover:border-violet-400"
            checked = {iscomplete}
            onChange= {toggle}
          />
          {/* Decorative Element */}

          <div className="w-2 h-2 rounded-full bg-violet-400 group-hover:scale-125 transition-transform duration-300"></div>
          
          {/* Content */}
          <div className={`flex-1 ${iscomplete ? 'line-through text-gray-900' : ''}`}>
            <div className="text-gray-100 font-medium group-hover:text-violet-300 transition-colors duration-300 ">
              {todoText}
            </div>
            <div className=" items-center gap-2 mt-1">
        
             <div className="flex justify-between ">
              <div className="flex">
              <svg className="w-4 h-3 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-xs text-gray-500"> : {formatdate(todoDate)}</span>
              </div>
            
             <span className="text-xs text-gray-500">Created: {formatdate(createdate)}</span>
             </div>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => deleteHandler()}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
