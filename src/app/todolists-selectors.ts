import { AppRootState } from "@/features/todolists/state/store"
import { TodolistType } from "@/features/todolists/state/todolist-slice"

export const selectTodolists = (state: AppRootState): TodolistType[] => state.todolists
