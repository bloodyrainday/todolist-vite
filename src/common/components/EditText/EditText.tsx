import { ChangeEvent, useState } from "react"

type EditTextPropsType = {
  title: string
  callback: (newTitle: string) => void
  disabled?: boolean
}

export const EditText = (props: EditTextPropsType) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>("")

  const onDoubleClickHandler = () => {
    if (props.disabled) {
      setEdit(false)
    } else {
      setEdit(true)
      setNewTitle(props.title)
    }
  }

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onBlurHandler = () => {
    setEdit(false)
    props.callback(newTitle)
  }

  return (
    <>
      {edit ? (
        <input onBlur={onBlurHandler} value={newTitle} autoFocus onChange={onTitleChangeHandler} />
      ) : (
        <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
      )}
    </>
  )
}
