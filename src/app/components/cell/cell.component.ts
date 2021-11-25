import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { CellStatus } from 'src/app/models/grid';
import { Point } from 'src/app/models/point';
import { updateCell } from 'src/app/store/grid.actions';
import { selectCurrentGrid } from 'src/app/store/grid.selectors';
import { GridState } from 'src/app/store/grid.state';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  //   @Input() color = '#ADD8E6';
  @Input() location = { x: -1, y: -1 } as Point;
  @Input() display = '';

  public CellStatus = CellStatus;

  public cellStatus: BehaviorSubject<CellStatus> = new BehaviorSubject<CellStatus>(CellStatus.Untouched);

  constructor(private store: Store<GridState>) {}
  ngOnInit(): void {
    this.store.select(selectCurrentGrid).subscribe((g) => {
      if (g) {
        this.cellStatus.next(g[this.location.y][this.location.x].status);
      }
    });
  }

  // @HostListener('mousedown', ['$event'])
  onClick(event: Event) {
    // console.log(event.target);
    this.store.dispatch(updateCell({ location: this.location, status: CellStatus.Traversed }));
  }
}
