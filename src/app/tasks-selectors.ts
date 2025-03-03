import { AppRootState } from "@/features/todolists/state/store";
import { TaskStorageType } from "@/features/todolists/state/task-reducer.";

export const selectsTasks = (state: AppRootState): TaskStorageType =>
  state.tasks;
