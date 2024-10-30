import { createWithStore } from "solid-zustand";
import type { Settings } from "~/types/Settings";

interface State {
	settings: Settings;
}

interface Actions {
	setSettings: (settings: Settings) => void;
}

export type SettingsStore = State & Actions;

export const useSettingsStore = createWithStore<SettingsStore>((set) => ({
	settings: {
		theme: "dark",
		show_category_filter: true,
		week_start_on_sunday: true,
		highlight_current_day: true,
	},
	setSettings: (settings) => set({ settings }),
}));
