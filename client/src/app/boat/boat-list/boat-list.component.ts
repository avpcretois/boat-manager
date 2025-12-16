import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Observable, of, switchMap } from 'rxjs';
import { Boat } from '../boat';
import { BoatFormComponent } from '../boat-form/boat-form.component';
import { BoatWithId } from '../boat-with-id';
import { BoatService } from '../boat.service';

@Component({
  selector: 'app-boat-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, KeyValuePipe],
  templateUrl: './boat-list.component.html',
  styleUrl: './boat-list.component.scss',
})
export class BoatListComponent implements AfterViewInit {
  private boatService = inject(BoatService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private boatsById = signal(new Map<number, BoatWithId>());
  boats = computed(() => Array.from(this.boatsById().values()));
  columns = {
    name: 'Name',
    registrationNumber: 'Registration Number'
  }
  columnsToDisplayWithExpand = [...(Object.keys(this.columns)), 'expand'];
  expandedBoat: BoatWithId | undefined = undefined;

  ngAfterViewInit(): void {
    this.boatService.getAllBoats().subscribe(boats => {
      const boatsMap = new Map<number, BoatWithId>();
      boats.forEach(boat => boatsMap.set(boat.id, boat));
      this.boatsById.set(boatsMap);
    })
  }

  /** Checks whether an element is expanded. */
  isExpanded(boat: BoatWithId) {
    return this.expandedBoat === boat;
  }

  /** Toggles the expanded state of a row. */
  toggle(boat: BoatWithId) {
    this.expandedBoat = this.isExpanded(boat) ? undefined : boat;
  }

  add() {
    this.openBoatFrom()
      .pipe(switchMap((newBoat) => newBoat ? this.boatService.postBoat(newBoat) : of(undefined)))
      .subscribe({
        next: (newBoat) => {
          if (newBoat) {
            this.boatsById.update((boatsById) => {
              const newMap = new Map(boatsById);
              newMap.set(newBoat.id, newBoat);
              return newMap;
            });
            this.snackBar.open('Boat successfully edited', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
          }
        },
        error: (err) => this.snackBar.open(`Failed to edit the boat. Reason : ${err.message}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      })
  }

  editBoat(originalBoat: BoatWithId): void {
    this.openBoatFrom(originalBoat)
      .pipe(switchMap((editedBoat) => editedBoat ? this.boatService.patchBoat(originalBoat.id, { ...editedBoat, id: originalBoat.id }) : of(undefined)))
      .subscribe({
        next: (editedBoat) => {
          if (editedBoat) {
            this.boatsById.update((boatsById) => {
              const newMap = new Map(boatsById);
              newMap.delete(originalBoat.id);
              newMap.set(editedBoat.id, editedBoat);
              return newMap;
            });
            this.snackBar.open('Boat successfully edited', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
          }
        },
        error: (err) => this.snackBar.open(`Failed to edit the boat. Reason : ${err.message}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      })
  }

  deleteBoat(boat: BoatWithId): void {
    this.boatService.deleteBoat(boat.id)
      .subscribe({
        next: () => {
          this.boatsById.update((boatsById) => {
            const newMap = new Map(boatsById);
            newMap.delete(boat.id);
            return newMap;
          });
          this.snackBar.open('Boat successfully deleted', 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
        },
        error: (err) => this.snackBar.open(`Failed to delete the boat. Reason : ${err.statusText}`, 'Close', { duration: 5 * 1000, verticalPosition: 'top' })
      });
  }

  private openBoatFrom(data?: BoatWithId): Observable<Boat> {
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
