/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import QueryClientProvider from "./lib/providers/queryClientProvider";
import { lazy } from "solid-js";

import "./styles/app.css";

//routes
import Titlebar from "./components/global/titlebar";
import Main from "./pages/main/page";
const Settings = lazy(() => import("./pages/settings/page"));
const Archived = lazy(() => import("./pages/archived/page"));

const root = document.getElementById("root") as HTMLElement;

render(
	() => (
		<QueryClientProvider>
			<Titlebar />
			<Router>
				<Route path="/" component={Main} />
				<Route path="/settings" component={Settings} />
				<Route path="/archived" component={Archived} />
			</Router>
			{/* comment out the following line to hide the devtools in production */}
		</QueryClientProvider>
	),
	root,
);
