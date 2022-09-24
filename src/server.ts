import axios from "axios";

const url = "http://localhost:3000";

export async function getFromServer() {
    const { data } = await axios.get(url + "/todos");
    return data;
}

export async function createTodo(todo: any) {
  return axios.post(url + "/todos", todo);
}
