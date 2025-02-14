import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AppWithReducers from "./AppWithReducers";

createRoot(document.getElementById("root")!).render(<AppWithReducers />);
