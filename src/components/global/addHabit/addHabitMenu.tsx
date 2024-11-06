import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import AddHabitForm from "./addHabitForm";
import { createSignal, type JSX } from "solid-js";
import { useMenuStore } from "~/context/menuStore";

interface Props {
	children: JSX.Element;
}

export default function AddHabitMenu(props: Props) {
	const menu = useMenuStore((state) => state);
	return (
		<Sheet open={menu().menu} onOpenChange={menu().setMenu}>
			<SheetTrigger>{props.children}</SheetTrigger>
			<SheetContent position="bottom">
				<SheetHeader>
					<SheetTitle>Create New Habit</SheetTitle>
					<SheetDescription>
						Start a new journey by creating a new habit.
					</SheetDescription>
				</SheetHeader>
				<AddHabitForm />
			</SheetContent>
		</Sheet>
	);
}
