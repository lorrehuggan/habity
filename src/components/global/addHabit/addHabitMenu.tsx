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

interface Props {
  children: JSX.Element;
}

export const [openMenu, setOpenMenu] = createSignal(false);

export default function AddHabitMenu(props: Props) {
  return (
    <Sheet open={openMenu()} onOpenChange={setOpenMenu}>
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
