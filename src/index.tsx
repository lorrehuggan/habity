/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import QueryClientProvider from "./lib/providers/queryClientProvider";

import "./styles/app.css";

//routes
import Titlebar from "./components/global/titlebar";
import Main from "./pages/main/page";
const Settings = lazy(() => import("./pages/settings/page"));
const Archived = lazy(() => import("./pages/settings/archived/page"));
const General = lazy(() => import("./pages/settings/general/page"));

const root = document.getElementById("root") as HTMLElement;

render(
	() => (
		<QueryClientProvider>
			<Titlebar />
			<Router>
				<Route path="/">
					<Route path="/" component={Main} />
					<Route path="/settings">
						<Route path="/" component={Settings} />
						<Route path="/archived" component={Archived} />
						<Route path="/general" component={General} />
					</Route>
				</Route>
			</Router>
		</QueryClientProvider>
	),
	root,
);
