import { AppRootState } from "@/features/todolists/state/store"
import { TodolistType } from "@/features/todolists/state/todolist-reducer"

export const selectTodolists = (state: AppRootState): TodolistType[] => state.todolists
