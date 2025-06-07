import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";

createRoot(document.getElementById("root") as Container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
