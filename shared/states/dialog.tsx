import { type IDialog } from '../types';
import { create } from 'zustand';

export const useDialog = create<IDialog>((set) => ({
  isOpen: false,
  component: <></>,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setComponent: (component) => set({ component })
}));
