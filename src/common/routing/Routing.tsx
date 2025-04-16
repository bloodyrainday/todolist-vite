import { Main } from "@/app/Main"
import { Login } from "@/features/todolists/ui/Todolists/Login/Login"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../components"

export const Path = {
  Main: "/",
  Login: "login",
  PageNotFound: "*",
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.PageNotFound} element={<PageNotFound />} />
  </Routes>
)
