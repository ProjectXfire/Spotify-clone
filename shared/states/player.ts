import { create } from 'zustand';
import { type IPlayer } from '../types';

export const usePlayer = create<IPlayer>((set) => ({
  ids: [],
  activeId: null,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ activeId: null, ids: [] })
}));
