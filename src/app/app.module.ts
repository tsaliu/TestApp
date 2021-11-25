import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/grid.reducers';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveComponentModule } from '@ngrx/component';
import { CellComponent } from './components/cell/cell.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, GridComponent, CellComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatGridListModule,
    ReactiveComponentModule,
    StoreModule.forRoot(
      { gridState: reducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states,
      logOnly: !environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
