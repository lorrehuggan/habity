import { Home, Plus, Settings } from "lucide-solid";
import AddHabitMenu from "../global/addHabit/addHabitMenu";
import { A, useLocation } from "@solidjs/router";
import { Match, Switch } from "solid-js";

export default function Header() {
	const location = useLocation();
	return (
		<div class="fixed top-8 left-0 z-50 flex h-16 w-full items-center bg-background">
			<nav class="mx-auto flex h-full w-11/12 items-center justify-between">
				<Switch>
					<Match when={location.pathname === "/"}>
						<A href="/settings">
							<Settings />
						</A>
					</Match>
					<Match when={location.pathname === "/settings"}>
						<A href="/">
							<Home />
						</A>
					</Match>
				</Switch>
				<AddHabitMenu>
					<button type="button">
						<Plus />
					</button>
				</AddHabitMenu>
			</nav>
		</div>
	);
}
