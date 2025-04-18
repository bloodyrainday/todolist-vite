import Button from "@mui/material/Button"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"

export const PageNotFound = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button className={styles.link} variant="contained" component={Link} to="/">
      get back to the main page
    </Button>
  </div>
)
