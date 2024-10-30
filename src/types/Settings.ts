type Theme = "light" | "dark";

export type Settings = {
	theme: Theme;
	show_category_filter: boolean;
	week_start_on_sunday: boolean;
	highlight_current_day: boolean;
};
