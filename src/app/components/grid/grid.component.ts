import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cell } from 'src/app/models/grid';
import { Queue } from 'src/app/models/queue';
import { initializeGrid } from 'src/app/store/grid.actions';
import {
  selectCurrentGrid,
  selectFlattenCurrentGrid,
  selectGridXSize,
  selectGridYSize,
  selectTotalSize,
} from 'src/app/store/grid.selectors';
import { GridState } from 'src/app/store/grid.state';
import { Point } from '../../models/point';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() numberOfRows = 100;
  @Input() numberOfCols = 100;
  @Input() start: Point = { y: 2, x: 5 };
  @Input() end: Point = { y: 10, x: 11 };
  @Input() delaySecond = 1;

  public ySize: Observable<number> = new Observable<number>();
  public xSize: Observable<number> = new Observable<number>();
  public total: Observable<number> = new Observable<number>();
  private screenWidth = 0;
  private screenHeight = 0;

  public flatGrid: Observable<Array<Cell>> = new Observable<Array<Cell>>();
  public grid: Observable<Array<Array<Cell>>> = new Observable<Array<Array<Cell>>>();
  private dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    // [1, -1],
    // [-1, -1],
    // [-1, 1],
    // [1, 1],
  ];

  private colorQueue = new Queue<number>();

  constructor(private store: Store<GridState>) {
    this.store.dispatch(
      initializeGrid({ ySize: this.numberOfRows, xSize: this.numberOfCols, startPoint: this.start, endPoint: this.end })
    );
    this.grid = this.store.select(selectCurrentGrid);
    this.flatGrid = this.store.select(selectFlattenCurrentGrid);
    this.xSize = this.store.select(selectGridXSize);
    this.ySize = this.store.select(selectGridYSize);
    this.total = this.store.select(selectTotalSize);
  }

  ngOnInit(): void {
    this.onWindowResize();
  }

  ngAfterViewInit(): void {
    // console.log(this.cellElements);
    // const startID = this.numberOfCols * this.start.y + this.start.x;
    // this.bfs();
    // this.changeTileColor();
  }

  startFlip(): void {
    for (let i = 0; i < this.numberOfCols; i++) {
      setTimeout(() => {
        const tile = document.querySelector(`#tile-${i}`);
        tile?.setAttribute('style', 'background: #000');
      }, 1 * 1000);
    }
  }

  // private bfs() {
  //   let q = new Queue<Point>([this.start]);
  //   const startID = this.numberOfCols * this.start.y + this.start.x;
  //   this.colorQueue.enqueue(startID);

  //   while (q.count > 0) {
  //     const size = q.count;
  //     for (let _ = 0; _ < size; _++) {
  //       let c = q.dequeue();
  //       if (c) {
  //         if (c.x === this.end.x && c.y === this.end.y) {
  //           console.log('found');
  //           return;
  //         }

  //         if (this.cellElements[c.y][c.x] != -1) {
  //           this.cellElements[c.y][c.x] = -1;
  //           const id = this.numberOfCols * c.y + c.x;
  //           this.colorQueue.enqueue(id);
  //         }

  //         for (let i = 0; i < this.dir.length; i++) {
  //           const ny = this.dir[i][0] + c.y;
  //           const nx = this.dir[i][1] + c.x;
  //           if (
  //             ny < 0 ||
  //             nx < 0 ||
  //             ny >= this.numberOfRows - 1 ||
  //             nx >= this.numberOfCols - 1 ||
  //             this.cellElements[ny][nx] == -1
  //           ) {
  //             continue;
  //           }

  //           q.enqueue({ y: ny, x: nx });
  //         }
  //       }
  //     }
  //   }
  // }

  // changeTileColor(color: string = 'black'): void {
  //   console.log(this.colorQueue.count);
  //   while (this.colorQueue.count > 0) {
  //     const q = this.colorQueue.dequeue();
  //     setTimeout(() => {
  //       const tile = document.querySelector(`#tile-${q}`);
  //       tile?.setAttribute('style', `background: ${color}`);
  //     }, 100);
  //   }
  // }

  counter(i: number) {
    console.log(i);
    return new Array(i);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    const gridListElement = document.querySelector('.grid-list');
    if (gridListElement) {
      const maxSize = (this.screenHeight > this.screenWidth ? this.screenWidth : this.screenHeight).toString();
      const styleString = 'max-height: ' + maxSize + 'px; max-width: ' + maxSize + 'px;';
      gridListElement.setAttribute('style', styleString);
    }
  }
}
