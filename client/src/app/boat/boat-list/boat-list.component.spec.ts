import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { BoatWithId } from '../boat-with-id';
import { BoatService } from '../boat.service';
import { BoatListComponent } from './boat-list.component';

describe('BoatListComponent', () => {
  let component: BoatListComponent;
  let fixture: ComponentFixture<BoatListComponent>;
  let boatServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    boatServiceMock = {
      getAllBoats: vi.fn().mockReturnValue(of([])),
      patchBoat: vi.fn(),
      postBoat: vi.fn(),
      deleteBoat: vi.fn(),
    };

    dialogMock = {
      open: vi.fn().mockReturnValue({
        afterClosed: () => of(undefined)
      })
    };

    await TestBed.configureTestingModule({
      imports: [BoatListComponent],
      providers: [
        { provide: BoatService, useValue: boatServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add boat when dialog is cancelled', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(undefined)
    });

    component.add();

    expect(component.boats().length).toBe(0);
  });

  it('should add boat when dialog returns data', () => {
    const newBoat = {
      name: 'Test Boat',
      registrationNumber: '12345678',
    };
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(newBoat)
    });
    boatServiceMock.postBoat.mockReturnValue(of({...newBoat, id: 1}))

    component.add();

    expect(component.boats().length).toBe(1);
    expect(component.boats()[0]).toEqual({...newBoat, id: 1} as BoatWithId);
  });

  it('should update boat when edited', () => {
    const originalBoat: BoatWithId = {
      name: 'Original',
      registrationNumber: '123',
      id: 1
    };
    const editedBoat: BoatWithId = {
      name: 'Edited',
      registrationNumber: '38',
      id: 1
    };

    // Setup initial state
    boatServiceMock.getAllBoats.mockReturnValue(of([originalBoat]));
    component.ngAfterViewInit();

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(editedBoat)
    });
    boatServiceMock.patchBoat.mockReturnValue(of(editedBoat));

    component.editBoat(originalBoat as any);

    expect(component.boats().length).toBe(1);
    expect(component.boats()[0]).toEqual(editedBoat);
    expect(boatServiceMock.patchBoat).toHaveBeenCalledWith(1, editedBoat);
  });
});
