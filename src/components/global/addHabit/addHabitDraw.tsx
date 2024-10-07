import { CircleCheck, X } from "lucide-solid";
import type { JSX } from "solid-js";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "~/components/ui/drawer";
import AddHabitForm from "./addHabitForm";

interface Props {
	children: JSX.Element;
}

export default function AddHabitDraw(props: Props) {
	return (
		<div>
			<Drawer>
				<DrawerTrigger>{props.children}</DrawerTrigger>
				<DrawerContent class="h-[85%] px-4">
					<div class="flex w-full items-center justify-between py-4">
						<DrawerClose class="text-left">
							<X class="text-muted-foreground" />
						</DrawerClose>
						<h3 class="font-bold text-muted-foreground">New Habit</h3>
						<button type="button">
							<CircleCheck class="text-muted-foreground" />
						</button>
					</div>
					<AddHabitForm />
				</DrawerContent>
			</Drawer>
		</div>
	);
}
