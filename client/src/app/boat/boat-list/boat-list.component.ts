import { AfterViewInit, Component, Inject, inject, signal, WritableSignal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Boat } from '../boat';
import { BoatService } from '../boat.service';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BoatFormComponent } from '../boat-form/boat-form.component';
import { mergeMap, Observable, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-boat-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, TitleCasePipe],
  templateUrl: './boat-list.component.html',
  styleUrl: './boat-list.component.scss',
})
export class BoatListComponent implements AfterViewInit {
  private boatService = inject(BoatService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private boatsById = signal(new Map<string, Boat>());
  boats = computed(() => Array.from(this.boatsById().values()));
  columnsToDisplay = ['name', 'identifier'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedBoat: Boat | undefined = undefined;

  ngAfterViewInit(): void {
    this.boatService.getAllBoats().subscribe(boats => {
      const boatsMap = new Map<string, Boat>();
      boats.forEach(boat => boatsMap.set(boat.identifier, boat));
      this.boatsById.set(boatsMap);
    })
  }

  /** Checks whether an element is expanded. */
  isExpanded(boat: Boat) {
    return this.expandedBoat === boat;
  }

  /** Toggles the expanded state of a row. */
  toggle(boat: Boat) {
    this.expandedBoat = this.isExpanded(boat) ? undefined : boat;
  }

  add() {
    this.openBoatFrom()
      .pipe(switchMap((editedBoat) => editedBoat ? this.boatService.postBoat(editedBoat) : of(undefined)))
      .subscribe({
        next: (newBoat) => {
          if (newBoat) {
            this.boatsById.update((boatsById) => {
              const newMap = new Map(boatsById);
              newMap.set(newBoat.identifier, newBoat);
              return newMap;
            });
            this.snackBar.open('Boat successfully edited', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
          }
        },
        error: (err) => this.snackBar.open(`Failed to edit the boat. Reason : ${err.message}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      })
  }

  editBoat(originalBoat: Boat): void {
    this.openBoatFrom(originalBoat)
      .pipe(switchMap((editedBoat) => editedBoat ? this.boatService.postBoat(editedBoat) : of(undefined)))
      .subscribe({
        next: (editedBoat) => {
          if (editedBoat) {
            this.boatsById.update((boatsById) => {
              const newMap = new Map(boatsById);
              newMap.delete(originalBoat.identifier);
              newMap.set(editedBoat.identifier, editedBoat);
              return newMap;
            });
            this.snackBar.open('Boat successfully edited', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
          }
        },
        error: (err) => this.snackBar.open(`Failed to edit the boat. Reason : ${err.message}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      })
  }

  deleteBoat(boat: Boat): void {
    this.boatService.deleteBoat(boat.identifier)
      .subscribe({
        next: () => {
          this.boatsById.update((boatsById) => {
            const newMap = new Map(boatsById);
            newMap.delete(boat.identifier);
            return newMap;
          });
          this.snackBar.open('Boat successfully deleted', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
        },
        error: (err) => this.snackBar.open(`Failed to delete the boat. Reason : ${err.statusText}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      });
  }

  private openBoatFrom(data?: Boat): Observable<Boat> {
    const boatFormDialogRef = this.dialog.open(BoatFormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '70%',
      width: '70%',
      data: data
    });

    return boatFormDialogRef.afterClosed();
  }
}
