//package
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.js";

//components
import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);
