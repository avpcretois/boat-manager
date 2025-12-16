import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Field, FieldState, form, min, pattern, required } from '@angular/forms/signals';
import { BoatWithId } from '../boat-with-id';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Boat } from '../boat';

@Component({
  selector: 'app-boat-form',
  imports: [MatInput,
    MatFormField,
    MatLabel,
    MatError,
    Field,
    MatButton,
    MatDialogModule],
  templateUrl: './boat-form.component.html',
  styleUrl: './boat-form.component.scss',
})
export class BoatFormComponent {
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);

  submited = signal(false);
  boatModel = signal({
    name: this.data?.name || '',
    registrationNumber: this.data?.registrationNumber || '',
    description: this.data?.description || '',
    lengthOverall: this.data?.lengthOverall || '',
    beam: this.data?.beam || '',
    draft: this.data?.draft || '',
    airDraft: this.data?.airDraft || '',
  });

  boatForm = form(this.boatModel, (schemaPath) => {
    required(schemaPath.name);
    pattern(schemaPath.name, /^[A-z]+( [A-z]+)*$/, {
      message: 'The boat name must only contain latin letters and spaces, cannot start or'
        + ' end by a space and cannot have two consecutive spaces.'
    });

    pattern(schemaPath.description, /\w/, {
      message: 'The description cannot be blank'
    });

    pattern(schemaPath.registrationNumber, /[0-9]{8}/, {
      message: 'The identifier is a 8 digits number'
    });

    min(schemaPath.lengthOverall, 0);

    min(schemaPath.beam, 0);

    min(schemaPath.draft, 0);

    min(schemaPath.airDraft, 0);
  });

  submit($event?: SubmitEvent): void {
    this.submited.set(true)
    $event?.preventDefault();
    this.dialogRef.close({
      name: this.boatModel().name,
      registrationNumber: this.extractIfTouched('registrationNumber'),
      description: this.extractIfTouched('description'),
      lengthOverall: this.extractIfTouched('lengthOverall'),
      beam: this.extractIfTouched('beam'),
      draft: this.extractIfTouched('draft'),
      airDraft: this.extractIfTouched('airDraft'),
    } as Boat);
  }

  private extractIfTouched(key: 'registrationNumber' | 'description' | 'lengthOverall' | 'beam' | 'draft' | 'airDraft'): string | number | undefined {
    if (typeof this.boatModel()[key] === 'string' && this.boatModel()[key]
      || typeof this.boatModel()[key] === 'number' && this.boatModel()[key] != 0) {
      return this.boatModel()[key];
    } else {
      return undefined;
    }
  }
}
