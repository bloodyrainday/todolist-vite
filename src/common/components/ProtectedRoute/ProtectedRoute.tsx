import { useAppSelector } from "@/common"
import { Path } from "@/common/routing/Routing"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"
import { Navigate } from "react-router"

type Props = {}

export const ProtectedRoute = (props: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }
  return <div>ProtectedRoute</div>
}
