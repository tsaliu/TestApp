import { Cell } from '../models/grid';
import { Point } from '../models/point';

export interface GridState {
  /**
   * The state of the grid
   *
   * @memberof GridState
   */
  grid: Array<Array<Cell>>;

  ySize: number;

  xSize: number;

  totalSize: number;

  startPoint?: Point;

  endPoint?: Point;

  isReady: boolean;
}

export const initialGridState: GridState = {
  grid: Array<Array<Cell>>(),
  xSize: 0,
  ySize: 0,
  totalSize: 0,
  startPoint: undefined,
  endPoint: undefined,
  isReady: false,
};
