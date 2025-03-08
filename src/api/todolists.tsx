import { TodolistType } from "@/features/todolists/state/todolist-reducer";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {};

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type FieldError = {
  error: string;
  field: string;
};

type CreateTodolistResponse = {
  data: { item: TodolistType };
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
};

const settings = {
  withCredentials: true,
  headers: {
    "api-key": "d83db838-fc8d-43ce-b06e-7535b34c286a",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const GetTodolists = (props: Props) => {
  const [state, setState] = useState<Todolist[]>([]);
  console.log(state);
  useEffect(() => {
    instance.get<Todolist[]>(`todo-lists`).then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolists = (props: Props) => {
  const [state, setState] = useState({});
  console.log(state);
  useEffect(() => {
    instance
      .post<CreateTodolistResponse>(
        `todo-lists`,
        { title: "what to learn" },
        settings
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

// export const UpdateTodolists = (props: Props) => {
//   const [state, setState] = useState(null);
//   console.log(state);
//   useEffect(() => {
//     axios
//       .post(
//         `https://social-network.samuraijs.com/api/1.1/todo-lists`,
//         { title: "what to learn" },
//         settings
//       )
//       .then((res) => {
//         setState(res.data);
//       });
//   }, []);
//   return <div>{JSON.stringify(state)}</div>;
// };
