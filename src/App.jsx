import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import LoadItems from "./components/LoadItems";
import TodoItems from "./components/TodoItems";
import { TodoItemsProvider } from "./store/TodoItemsContext";

function App() {
  return (
    <TodoItemsProvider>
      <div className="min-h-screen bg-[#0F172A] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <AppName />
          <AddTodo />
          <LoadItems />
          <TodoItems />
        </div>
      </div>
    </TodoItemsProvider>
  );
}

export default App;
