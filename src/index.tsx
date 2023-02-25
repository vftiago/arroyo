import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppContainer from "./components/AppContainer";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

createRoot(root!).render(
	<React.StrictMode>
		<AppContainer />
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
