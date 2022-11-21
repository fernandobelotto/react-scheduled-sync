import { useTodos } from "./useTodos";

export default function App() {

  const { todos, handleTask } = useTodos()



  return (
    <>
      <h1>Scheduled Taks</h1>

      <Sync />


      <button onClick={() => handleTask("new todo")}>add todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </>
  );
}

function Sync() {

  const { isSync, isLoading, isError } = useTodos()

  if (isError) return <p>Failed to sincronize.</p>

  if (isLoading) return <p>Tasks are sincronizing...</p>
  if (isSync) return (
    <>
      <p>Sincronized.</p>
      <button>Sync</button>
    </>
  )
  return (
    <>
      <p>well idk...</p>
    </>
  )
}