import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm, EditText } from "@/common/components";
import { Todolist } from "@/features/todolists/api/todolistApi.types";
import { todolistApi } from "@/features/todolists/api/todolistApi";
import axios from "axios";
import { instance } from "@/common";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<any>({});

  useEffect(() => {
    todolistApi.getTodolists().then((res) => setTodolists(res.data));
    instance
      .get(`todo-lists/${todolists[0].id}/tasks`)
      .then((res) => console.log("tasks", res));
  }, []);

  const createTodolist = (title: string) => {
    todolistApi
      .createTodolist(title)
      .then((res) => setTodolists([res.data.data.item, ...todolists]));
  };

  const deleteTodolist = (id: string) => {
    todolistApi.deleteTodolist(id).then((res) => {
      setTodolists(todolists.filter((tl) => tl.id !== id));
    });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    todolistApi.changeTodolistTitle(id, title).then((res) => {
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
