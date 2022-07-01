import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface NavbarSideBarState {
  opened: boolean;
  toggleOpened: () => void;
}

export const useNavbarSidebarStore = create<NavbarSideBarState>()(
  devtools((set) => ({
    opened: false,
    toggleOpened: () => set((state) => ({ opened: !state.opened })),
  }))
);
