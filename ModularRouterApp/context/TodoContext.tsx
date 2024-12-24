// context/TodoContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

const TodoContext = createContext({
  todos: [] as string[],
  addTodo: (todo: string) => {},
  deleteTodo: (index: number) => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (todo: string) => setTodos((prev) => [...prev, todo]);
  const deleteTodo = (index: number) =>
    setTodos((prev) => prev.filter((_, i) => i !== index));

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
