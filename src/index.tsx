/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import QueryClientProvider from "./lib/providers/queryClientProvider";
import { lazy } from "solid-js";

import "./styles/app.css";

import Titlebar from "./components/global/titlebar";
//routes
import Main from "./pages/main/page";
const Settings = lazy(() => import("./pages/settings/page"));

const root = document.getElementById("root") as HTMLElement;

render(
	() => (
		<QueryClientProvider>
			<Titlebar />
			<Router>
				<Route path="/" component={Main} />
				<Route path="/settings" component={Settings} />
			</Router>
			{/* comment out the following line to hide the devtools in production */}
		</QueryClientProvider>
	),
	root,
);
