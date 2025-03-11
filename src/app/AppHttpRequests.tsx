import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm, EditText } from "@/common/components";
import axios from "axios";

const token = "224d274d-6067-4630-9618-70fa1a5cf17c";
const apiKey = "d83db838-fc8d-43ce-b06e-7535b34c286a";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<any>({});

  useEffect(() => {
    axios
      .get<Todolist[]>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTodolists(res.data));
  }, []);

  const createTodolist = (title: string) => {
    axios
      .post<BaseResponse<{ item: Todolist }>>(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
        }
      )
      .then((res) => setTodolists([res.data.data.item, ...todolists]));
  };

  const deleteTodolist = (id: string) => {
    axios
      .delete<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
        }
      )
      .then((res) => {
        console.log(res);

        setTodolists(todolists.filter((tl) => tl.id !== id));
      });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    axios
      .put<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "api-key": apiKey,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setTodolists(
          todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))
        );
      });
  };

  const createTask = (todolistId: string, title: string) => {};

  const deleteTask = (todolistId: string, taskId: string) => {};

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {};

  const changeTaskTitle = (task: any, title: string) => {};

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolist} />
      {todolists.map((todolist: any) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditText
              title={todolist.title}
              callback={(title) => changeTodolistTitle(todolist.id, title)}
            />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItemForm addItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={(e) => changeTaskStatus(e, task)}
              />
              <EditText
                title={task.title}
                callback={(title) => changeTaskTitle(task, title)}
              />
              <button onClick={() => deleteTask(todolist.id, task.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

export type FieldError = {
  error: string;
  field: string;
};

type BaseResponse<D = {}> = {
  data: D;
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
};

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
