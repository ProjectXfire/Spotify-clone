export interface IPlayer {
  ids: string[];
  activeId: string | null;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}
