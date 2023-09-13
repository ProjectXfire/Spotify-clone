import { type ILoading } from '../types';
import { create } from 'zustand';

export const useLoading = create<ILoading>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));
