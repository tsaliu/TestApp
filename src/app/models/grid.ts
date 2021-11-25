import { Point } from './point';

export enum CellStatus {
  Untouched,
  Traversed,
  BestRoute,
}

export interface Cell {
  location: Point;
  status: CellStatus;
}

// export interface Grid {
//   grid: Array<Array<Cell>>;
// }
