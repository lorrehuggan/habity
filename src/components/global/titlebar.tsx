import { Minus, X } from "lucide-solid";
import { Window } from "@tauri-apps/api/window";

const appWindow = new Window("main");

export default function Titlebar() {
	return (
		<div
			data-tauri-drag-region
			class="fixed top-0 left-0 z-[9999] flex h-8 w-screen items-center justify-between bg-black px-2 text-muted-foreground"
		>
			<div class="font-bold text-xs">Habity</div>
			<div class="flex items-center">
				<button
					class="cursor-pointer rounded p-1 transition-colors duration-300 ease-out hover:bg-muted-foreground/30"
					onClick={() => appWindow.minimize()}
					type="button"
				>
					<Minus size={16} />
				</button>
				<button
					class="cursor-pointer rounded p-1 transition-colors duration-300 ease-out hover:bg-rose-400/60 hover:text-white"
					onClick={() => appWindow.close()}
					type="button"
				>
					<X size={16} />
				</button>
			</div>
		</div>
	);
}
