import { TaskStorageType } from "./AppWithRedux";
import { AppRootState } from "../state/store";

export const selectsTasks = (state: AppRootState): TaskStorageType =>
  state.tasks;
