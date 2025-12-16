import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Field, FieldState, form, min, pattern, required } from '@angular/forms/signals';
import { BoatWithId } from '../boat-with-id';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

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
    identifier: this.data?.identifier || '',
    description: this.data?.description || '',
    lengthOverall: this.data?.lengthOverall || 0,
    beam: this.data?.beam || 0,
    draft: this.data?.draft || 0,
    airDraft: this.data?.airDraft || 0,
  });

  boatForm = form(this.boatModel, (schemaPath) => {
    required(schemaPath.name);
    pattern(schemaPath.name, /^[A-z]+( [A-z]+)*$/, {
      message: 'The boat name must only contain latin letters and spaces, cannot start or'
        + ' end by a space and cannot have two consecutive spaces.'
    });

    required(schemaPath.description)
    pattern(schemaPath.description, /\w/, {
      message: 'The description cannot be blank'
    })

    pattern(schemaPath.identifier, /[0-9]{8}/, {
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
      registrationNumber: this.boatModel().identifier,
      description: this.extractIfTouched('description'),
      lengthOverall: this.extractIfTouched('lengthOverall'),
      beam: this.extractIfTouched('beam'),
      draft: this.extractIfTouched('draft'),
      airDraft: this.extractIfTouched('airDraft'),
    } as BoatWithId);
  }

  private extractIfTouched(key: 'description' | 'lengthOverall' | 'beam' | 'draft' | 'airDraft'): string | number | undefined {
    return this.boatForm[key]().touched() || this.data?.[key] !== undefined ? this.boatModel()[key] : undefined
  }
}
