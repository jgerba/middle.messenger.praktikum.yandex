// remove dependency cycle
export interface IBlock {
  _id: string;
  getContent(): HTMLElement;
}
