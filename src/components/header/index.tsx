import { Plus, Settings } from "lucide-solid";
import AddHabitDraw from "../global/addHabit/addHabitDraw";

export default function Header() {
	return (
		<div class="fixed top-10 left-0 z-50 flex h-8 w-full items-center">
			<nav class="mx-auto flex h-full w-11/12 items-center justify-between">
				<button type="button">
					<Settings />
				</button>
				<AddHabitDraw>
					<button type="button">
						<Plus />
					</button>
				</AddHabitDraw>
			</nav>
		</div>
	);
}
