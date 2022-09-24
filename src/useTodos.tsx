import { useEffect, useState } from "react";
import { clearLocal, getLocal, saveLocal } from "./localStorage";
import { createTodo, getFromServer } from "./server";

export function useTodos() {
  const [todos, setTodos] = useState<{ content: string; id: string }[]>([]);

  async function handleTask(content: string) {
    const newTodo = {
      content,
      id: (Math.random() * 10000).toFixed().toString(),
    };
    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
    saveLocal("todos", newTodos);

    try {
      await createTodo(newTodo);
    } catch (e) {
      const tasks = getLocal("queue");
      if (tasks) {
        return saveLocal("queue", [...tasks, newTodo]);
      }
      return saveLocal("queue", [newTodo]);
    }
  }

  async function handleStartup() {
    const tasks = getLocal("queue");
    const todos = getLocal("todos");

    if (todos) {
      setTodos(todos);
    } else {
      const todos = await getFromServer();
      saveLocal("todos", todos);
      setTodos(todos);
    }

    if (tasks) {
      try {
        const synchronized = await syncTasks(tasks)
        if (synchronized) {
          try {
            const todos = await getFromServer();
            saveLocal("todos", todos);
            setTodos(todos);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function syncTasks(tasks: any) {
    const taskToDo = tasks

    for (var i = tasks.length - 1; i >= 0; i--) {
      let task = tasks[i]
      try {
        await createTodo(task)
        taskToDo.pop()
      } catch (e) {
        console.log(e)
      }
    }

    if (taskToDo.length === 0) {
      clearLocal('queue')
      return true
    } else {
      saveLocal('queue', taskToDo)
      return false
    }

  }

  useEffect(() => {
    handleStartup();
  }, []);

  return {
    todos,
    handleTask,
  };
}
