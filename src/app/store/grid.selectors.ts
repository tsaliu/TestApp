import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Point } from '../models/point';
import { GridState } from './grid.state';

export const selectGridState = createFeatureSelector<GridState>('gridState');

export const selectCurrentGrid = createSelector(selectGridState, (state: GridState) => state.grid);

export const selectFlattenCurrentGrid = createSelector(selectGridState, (state: GridState) => state?.grid.flat(1));

export const selectCell = (location: Point) =>
  createSelector(selectGridState, (state: GridState) => {
    if (
      location.x < 0 ||
      location.y < 0 ||
      (state.grid.length <= location.y && state.grid[location.y].length <= location.x)
    ) {
      return null;
    }

    return state.grid[location.y][location.x];
  });

export const selectGridXSize = createSelector(selectGridState, (state: GridState) => state?.xSize);

export const selectGridYSize = createSelector(selectGridState, (state: GridState) => state?.ySize);

export const selectTotalSize = createSelector(selectGridState, (state: GridState) => state?.totalSize);
