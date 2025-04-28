import { ChangeEvent, useState } from "react"
import { IconButton, Stack, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  label?: string
  disabled?: boolean
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }
  const onAddTaskClickHandler = () => {
    if (inputValue.trim() !== "") {
      props.addItem(inputValue)
    } else {
      setError(true)
    }
    setInputValue("")
  }
  return (
    <Stack direction="row">
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        className={error ? "error-message" : ""}
        value={inputValue}
        onChange={onChangeInputValueHandler}
        disabled={props.disabled}
      />

      <IconButton onClick={onAddTaskClickHandler} disabled={props.disabled}>
        <AddBox />
      </IconButton>
      {/* <Button icon={<AddBox />} title="+" callback={onAddTaskClickHandler} /> */}
      {error && (
        <p className="error" style={{ margin: "0px" }}>
          title is required
        </p>
      )}
    </Stack>
  )
}
