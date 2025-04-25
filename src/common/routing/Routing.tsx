import { Main } from "@/app/Main"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../components"
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute"
import { useAppSelector } from "../hooks/useAppSelector"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"

export const Path = {
  Main: "/",
  Login: "/login",
  Dashboard: "/dashboard",
  PageNotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      {/* private routes */}
      {/* <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}>
            <Main />
          </ProtectedRoute>
        }
      />}
      

      {/* private route. if user is not logged in */}
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>

      {/* private route. if user is logged in */}
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      {/* <Route path={Path.Login} element={<Login />} /> */}
      <Route path={Path.PageNotFound} element={<PageNotFound />} />
    </Routes>
  )
}
