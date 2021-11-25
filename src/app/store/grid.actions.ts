import { createAction, props } from '@ngrx/store';
import { Point } from '../models/point';
import { CellStatus } from '../models/grid';

export const initializeGrid = createAction(
  'Initialize Grid',
  props<{ ySize: number; xSize: number; startPoint: Point; endPoint: Point }>()
);

export const updateCell = createAction('Update Cell', props<{ location: Point; status: CellStatus }>());
