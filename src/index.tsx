/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { render } from "solid-js/web";

import "./styles/app.css";

//routes
import Main from "./pages/main/page";
import Titlebar from "./components/global/titlebar";
const queryClient = new QueryClient();

const root = document.getElementById("root") as HTMLElement;

render(
	() => (
		<QueryClientProvider client={queryClient}>
			<Titlebar />
			<Router>
				<Route path="/" component={Main} />
			</Router>
			{/* comment out the following line to hide the devtools in production */}
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	),
	root,
);
