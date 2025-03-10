import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import Checkbox from "@mui/material/Checkbox";
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm";
import { EditText } from "@/common/components/EditText/EditText";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<any>([]);
  const [tasks, setTasks] = useState<any>({});

  useEffect(() => {
    // get todolists
  }, []);

  const createTodolist = (title: string) => {};

  const deleteTodolist = (id: string) => {};

  const changeTodolistTitle = (id: string, title: string) => {};

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
