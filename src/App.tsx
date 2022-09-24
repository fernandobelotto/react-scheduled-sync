import { useTodos } from "./useTodos";

export default function App() {

  const { todos, handleTask } = useTodos()

  return (
    <>
      <h1>Scheduled Taks</h1>
      <button onClick={() => handleTask("new todo")}>add todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </>
  );
}
