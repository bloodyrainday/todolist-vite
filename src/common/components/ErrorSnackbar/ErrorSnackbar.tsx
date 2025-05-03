import * as React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectError, setError } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  //const [open, setOpen] = React.useState(false)

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setError({ error: null }))
    //setOpen(false)
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
        {error}
      </Alert>
    </Snackbar>
  )
}
