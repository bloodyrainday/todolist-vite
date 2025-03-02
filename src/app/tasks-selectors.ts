import { TaskStorageType } from "@/state/task-reducer.";
import { AppRootState } from "../state/store";

export const selectsTasks = (state: AppRootState): TaskStorageType =>
  state.tasks;
