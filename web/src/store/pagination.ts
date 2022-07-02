import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaginationState {
  limit: number;
  activePage: number;
  setLimit: (limit: number) => void;
  setActivePage: (activePage: number) => void;
}

export const usePaginationStore = create<PaginationState>()(
  devtools((set) => ({
    limit: 5,
    activePage: 1,
    setLimit: (limit: number) => set({ limit }),
    setActivePage: (activePage: number) => set({ activePage }),
  }))
);
