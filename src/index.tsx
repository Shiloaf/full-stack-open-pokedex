import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles.css";

import { Provider } from "react-redux";
import store from "./store/reduxStore";

const basename =
  process.env.NODE_ENV === "production" ? "/full-stack-open-pokedex" : "";

createRoot(document.getElementById("app")!).render(
  <Provider store={store}>
    <Router basename={basename}>
      <App />
    </Router>
  </Provider>
);
