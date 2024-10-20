import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getHabitThemeColor(color: string) {
	switch (color) {
		case "Blue":
			return "210, 60%, 50%";
		case "Cyan":
			return "180, 70%, 60%";
		case "Green":
			return "150, 50%, 45%";
		case "Yellow":
			return "50, 80%, 70%";
		case "Orange":
			return "30, 70%, 60%";
		case "Red":
			return "0, 65%, 55%";
		case "Magenta":
			return "300, 60%, 50%";
		case "Grey":
			return "0, 0%, 75%";
	}
}

export const habitThemes = [
	"Blue",
	"Cyan",
	"Green",
	"Yellow",
	"Orange",
	"Red",
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
