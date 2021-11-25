import { Action, createReducer, on } from '@ngrx/store';
import { GridState, initialGridState } from './grid.state';
import * as GridActions from './grid.actions';
import { Cell, CellStatus } from '../models/grid';
import { Point } from '../models/point';

export const gridReducer = createReducer(
  initialGridState,
  on(GridActions.initializeGrid, (state, action) => ({
    ...state,
    grid: createGrid(action.ySize, action.xSize),
    startPoint: action.startPoint,
    endPoint: action.endPoint,
    xSize: action.xSize,
    ySize: action.ySize,
    totalSize: action.xSize * action.ySize,
    isReady: true,
  })),

  on(GridActions.updateCell, (state, action) => ({
    ...state,
    grid: updateCell(state.grid, action.location, action.status),
  }))
);

export function reducer(state: GridState | undefined, action: Action) {
  return gridReducer(state, action);
}

function createGrid(ySize: number, xSize: number): Array<Array<Cell>> {
  let output = new Array<Array<Cell>>();
  const total = ySize * xSize;
  for (let i = 0; i < ySize; i++) {
    let temp = new Array<Cell>();
    for (let k = 0; k < xSize; k++) {
      temp.push({ location: { y: i, x: k } as Point, status: CellStatus.Untouched } as Cell);
    }
    output.push(temp);
  }
  return output;
}

function updateCell(grid: Array<Array<Cell>>, location: Point, status: CellStatus): Array<Array<Cell>> {
  // grid.map((r) => {
  //   r.map((c) => (c.location.x === location.x && c.location.y == location.y ? { ...c, status: status } : c));
  // });
  // // const newGrid = JSON.parse(JSON.stringify(grid));
  // grid[location.y][location.x].status = status;
  // // console.log(status);
  // console.log(grid[0][0]);

  let newGrid = [...grid];
  newGrid[location.y][location.x].status = status;
  return newGrid;
}
