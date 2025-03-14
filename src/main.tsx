import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./features/todolists/state/store";
import { AppHttpRequests } from "./app/AppHttpRequests";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppHttpRequests />
  </Provider>
);
