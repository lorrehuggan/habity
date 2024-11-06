import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getHabitThemeColor(color: string) {
	switch (color) {
		case "Blue":
			return "217.22, 91.22%, 59.8%";
		case "Cyan":
			return "188.74, 94.5%, 42.75%";
		case "Green":
			return "142.09, 70.56%, 45.29%";
		case "Yellow":
			return "45.4, 93.39%, 47.45%";
		case "Orange":
			return "24.58, 94.98%, 53.14%";
		case "Red":
			return "0, 84.24%, 60.2%";
		case "Magenta":
			return "292.19, 84.08%, 60.59%";
		case "Grey":
			return "0, 0%, 45.1%";
		case "Amber":
			return "37.69, 92.13%, 50.2%";
		case "Lime":
			return "83.74, 80.53%, 44.31%";
		case "Indigo":
			return "238.73, 83.53%, 66.67%";
		case "Rose":
			return "349.72, 89.16%, 60.2%";
		case "Emerald":
			return "160.12, 84.08%, 39.41%";
	}
}

export const habitThemes = [
	"Blue",
	"Indigo",
	"Cyan",
	"Emerald",
	"Green",
	"Lime",
	"Yellow",
	"Amber",
	"Orange",
	"Red",
	"Rose",
	"Magenta",
	"Grey",
];

export const isToday = (date: string) => dayjs(date).isSame(dayjs(), "day");

export const isAfterToday = (date: string) =>
	dayjs(date).isAfter(dayjs(), "day");

export const isBeforeToday = (date: string) =>
	dayjs(date).isBefore(dayjs(), "day");

export const isThisWeek = (date: string) => dayjs(date).isSame(dayjs(), "week");

export const isAfterThisWeek = (date: string) =>
	dayjs(date).isAfter(dayjs(), "week");

export const isBeforeThisWeek = (date: string) =>
	dayjs(date).isBefore(dayjs(), "week");

export const isThisMonth = (date: string) =>
	dayjs(date).isSame(dayjs(), "month");

export const isAfterThisMonth = (date: string) =>
	dayjs(date).isAfter(dayjs(), "month");

export const isBeforeThisMonth = (date: string) =>
	dayjs(date).isBefore(dayjs(), "month");
