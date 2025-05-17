import { selectCaptchaUrl, selectThemeMode, setCaptchaUrl, setIsLoggedIn } from "@/app/app-slice"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { LoginInputs, loginSchema } from "@/features/auth/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetCaptchaUrlQuery, useLazyGetCaptchaUrlQuery, useLoginMutation } from "../../api/authApi"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { useEffect, useState } from "react"

// type Inputs = {
//   email: string
//   password: string
//   rememberMe: boolean
// }

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema),
  })
  //const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const captcha = useAppSelector(selectCaptchaUrl)
  const [trigger, captchaUrl] = useLazyGetCaptchaUrlQuery()
  console.log("captcha", captchaUrl)
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  //const navigate = useNavigate()

  //var 1
  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }

  //var 2
  // useEffect(() => {
  //   if (isLoggedIn) {
  //   navigate(Path.Main)
  // }
  // }, [isLoggedIN])

  const [login] = useLoginMutation()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    //dispatch(loginTC(data)) //.then(() => navigate(Path.Main))
    console.log("data", data)
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setCaptchaUrl({ captchaUrl: null }))
        //reset()
      } else if (res.data?.resultCode === ResultCode.CaptchaError) {
        trigger().then((res) => {
          if (res.data) {
            dispatch(setCaptchaUrl({ captchaUrl: res.data.url }))
          }
        })
      }
    })
  }
  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField label="Email" margin="normal" {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
              {...register("rememberMe")}
            />
            {captcha && <img src={captcha} alt="captcha" />}
            {captcha && <TextField type="text" label="symbols from image" margin="normal" {...register("captcha")} />}
            {errors.captcha && <span className={styles.errorMessage}>{errors.captcha.message}</span>}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
