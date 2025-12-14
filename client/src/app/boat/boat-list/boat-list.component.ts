import { AfterViewInit, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Boat } from '../boat';
import { BoatService } from '../boat.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-boat-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, TitleCasePipe],
  templateUrl: './boat-list.component.html',
  styleUrl: './boat-list.component.scss',
})
export class BoatListComponent implements AfterViewInit {
  private boatService = inject(BoatService);
  boats: WritableSignal<Boat[]> = signal([]);
  columnsToDisplay = ['name', 'identifier'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedBoat: Boat | undefined = undefined;

  ngAfterViewInit(): void {
    this.boatService.getAllBoats().subscribe(this.boats.set)
  }

  /** Checks whether an element is expanded. */
  isExpanded(boat: Boat) {
    return this.expandedBoat === boat;
  }

  /** Toggles the expanded state of a row. */
  toggle(boat: Boat) {
    this.expandedBoat = this.isExpanded(boat) ? undefined : boat;
  }

  editBoat(boat: Boat): void {
    this.boatService.getAllBoats().subscribe(this.boats.set)
  }

  deleteBoat(boat: Boat): void {

  }
}
