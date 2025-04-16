import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import AppWithRedux from "./app/AppWithRedux"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppWithRedux />
    </BrowserRouter>
  </Provider>,
)
