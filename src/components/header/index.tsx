import { ArrowLeft, Home, Plus, Settings } from "lucide-solid";
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
							<Settings size={18} />
						</A>
					</Match>
					<Match when={location.pathname === "/settings/archived"}>
						<A href="/settings">
							<ArrowLeft size={18} />
						</A>
					</Match>
					<Match when={location.pathname === "/settings/general"}>
						<A href="/settings">
							<ArrowLeft size={18} />
						</A>
					</Match>
					<Match when={location.pathname !== "/"}>
						<A href="/">
							<Home size={18} />
						</A>
					</Match>
				</Switch>
				<Switch>
					<Match when={location.pathname === "/"}>
						<AddHabitMenu>
							<button type="button">
								<Plus size={18} />
							</button>
						</AddHabitMenu>
					</Match>
				</Switch>
			</nav>
		</div>
	);
}
