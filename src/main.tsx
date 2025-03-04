import { createRoot } from "react-dom/client";
import "./index.css";
import AppWithRedux from "./app/AppWithRedux";
import { Provider } from "react-redux";
import { store } from "./features/todolists/state/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);
