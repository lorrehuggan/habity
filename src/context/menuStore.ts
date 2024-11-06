import { createWithSignal } from "solid-zustand";

interface State {
  menu: boolean;
}

interface Actions {
  setMenu: (menu: boolean) => void;
}

export type MenuStore = State & Actions;

export const useMenuStore = createWithSignal<MenuStore>((set) => ({
  menu: false,
  setMenu: (menu) => set({ menu }),
}));
