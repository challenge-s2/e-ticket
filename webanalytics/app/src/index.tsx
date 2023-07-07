import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { TrackingProvider } from "./sdk.es";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.Fragment>
      <Router>
        <TrackingProvider
          appId="8f8b0fa4-0d75-4af9-9b28-3d77f016d46b"
          withTrackingSession={true}
          withTrackingMouse={true}
        >
          <App />
        </TrackingProvider>
      </Router>
    </React.Fragment>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
