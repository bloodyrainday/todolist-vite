import { Path } from "@/common/routing/Routing"
import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"

type Props = {
  redirectPath?: string
  isAllowed: boolean
  children?: ReactNode
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}
