import create from 'zustand';

import { Book } from '../components/Table';

interface IFetcher {
  data: Book[];
  totalData: number;
}

interface TableStore {
  isLoading: boolean;
  data: IFetcher | null;
  toggleLoading: () => void;
  setData: (data: IFetcher) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  isLoading: true,
  data: null,
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setData: (data: IFetcher) => set({ data }),
}));
