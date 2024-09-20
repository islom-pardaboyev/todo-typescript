import { FormEvent, useState } from "react";
import TodoCard from "./components/TodoCard";
import { toast } from "react-toastify";

export type TodosType = {
  id: number;
  todo: string;
  completed: boolean;
  createdAt: string;
};

function App() {
  const [todos, setTodos] = useState<TodosType[]>([]);

  function handleDeleteItem(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    toast.success("Todo Successfully Deleted")
  }

  function handleUpdateTodoTitle(id: number) {
    console.log(id);
    const clickedTodo = todos.find((item) => item.id == id);
    if (clickedTodo) {
      let newTodoValue: string | null = prompt(
        "Enter new title",
        clickedTodo.todo
      );

      if (newTodoValue) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, todo: newTodoValue } : todo
        );
        setTodos(updatedTodos);
      }
      toast.success("Todo Successfully Updated")
    }
  }

  function handleMakeCompletedTodo(id: number) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    toast.success("Todo Successfully Completed")
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const todoTitle = (form.elements.namedItem("todoTitle") as HTMLInputElement)
      .value;

    if (todoTitle) {
      const newTodo: TodosType = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        todo: todoTitle,
        completed: false,
        createdAt: new Date().toLocaleDateString(),
      };

      setTodos([...todos, newTodo]);
      form.reset();
      toast.success("Todo Successfully Added")
    }
    if (!todoTitle) toast.error(<p className="capitalize">please enter a valid value</p>);
  }

  return (
    <section className="flex items-center flex-col justify-center h-screen bg-black text-white">
      <h1 className="text-5xl capitalize text-white mb-14 font-bold">
        Welcome back 👋
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-md p-5 w-[500px]"
      >
        <div></div>
        <div className="flex items-center gap-2">
          <input
            name="todoTitle"
            className="border border-black rounded-md text-black outline-none p-2 w-full"
            placeholder="Create Own Todo"
          />
          <button type="submit" className="bg-sky-400 py-2 px-8 hover:bg-sky-600 duration-300 rounded-md">
            Add
          </button>
        </div>
        <ul className="h-[300px] border flex overflow-y-auto flex-col gap-4 border-black text-black mt-5 rounded-md">
          {todos.length ? (
            todos.map((item: TodosType, index: number) => (
              <TodoCard
                key={item.id}
                update={handleUpdateTodoTitle}
                completed={item.completed}
                onChange={handleMakeCompletedTodo}
                item={item}
                index={index}
                onDelete={handleDeleteItem}
              />
            ))
          ) : (
            <p className="italic font-medium text-md text-gray-400 text-center capitalize">
              not yet todos created
            </p>
          )}
        </ul>
      </form>
    </section>
  );
}

export default App;
