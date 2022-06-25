import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaginationState {
  page: number;
  limit: number;
  activePage: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setActivePage: (activePage: number) => void;
}

export const usePaginationStore = create<PaginationState>()(
  devtools((set) => ({
    page: 1,
    limit: 5,
    activePage: 1,
    setPage: (page: number) => set({ page }),
    setLimit: (limit: number) => set({ limit }),
    setActivePage: (activePage: number) => set({ activePage }),
  }))
);
