import { Minus, X } from "lucide-solid";

export default function Titlebar() {
	return (
		<div class="fixed top-0 left-0 flex h-8 w-full items-center justify-between bg-muted-foreground/20 px-2">
			<div class="font-bold text-xs">Habity</div>
			<div class="flex items-center gap-2">
				<button type="button">
					<Minus size={16} />
				</button>
				<button type="button">
					<X size={16} />
				</button>
			</div>
		</div>
	);
}
