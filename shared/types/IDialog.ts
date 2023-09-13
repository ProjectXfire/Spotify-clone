export interface IDialog {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  component: React.ReactNode;
  setComponent: (component: React.ReactNode) => void;
}
