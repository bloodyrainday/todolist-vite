import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./app/AppWithRedux";
import { Provider } from "react-redux";
import { store } from "./state/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);
