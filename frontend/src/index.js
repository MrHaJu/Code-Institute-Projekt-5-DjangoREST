import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <CurrentUserProvider>
            <ProfileDataProvider>
                <App />
            </ProfileDataProvider>
        </CurrentUserProvider>
    </Router>,
);

reportWebVitals();