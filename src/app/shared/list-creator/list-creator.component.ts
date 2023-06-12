import { Component, Input, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
import { List } from 'src/app/models/list.model';
import { ListTypesEnum } from 'src/app/models/list-type.enum';

@Component({
  selector: 'app-list-creator',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <button mat-stroked-button color="primary" (click)="onCreateNewList()">
      <ng-content></ng-content>
    </button>

    <ng-template #createListFormTemplate>
      <h2 mat-dialog-title>Define a new workspace</h2>
      <div mat-dialog-content>
        <form [formGroup]="createListForm">
          <mat-form-field appearance="outline">
            <mat-label>List name</mat-label>
            <input
              matInput
              name="listNameControl"
              type="text"
              formControlName="listName"
            />
          </mat-form-field>
        </form>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-stroked-button color="primary" (click)="onClose()">Close</button>
        <button mat-flat-button color="primary" (click)="onSave()">Save</button>
      </div>
    </ng-template>
  `,
})
export class ListCreator {
  private dialogRef: MatDialogRef<any, any> | null = null;

  @Input() type!: ListTypesEnum;
  @Input() parentListName: string | null = null;
  @ViewChild('createListFormTemplate') createListFormTemplate!: any;

  listNameFormControl = new FormControl<string>('', [Validators.required]);
  createListForm = new FormGroup<any>({
    listName: this.listNameFormControl,
  });

  constructor(
    private readonly dialog: MatDialog,
    private readonly lService: ListsService
  ) {}

  onCreateNewList() {
    this.dialogRef = this.dialog.open(this.createListFormTemplate);
  }

  onClose() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onSave() {
    if (this.dialogRef) {
      const listNameFormValue = this.createListForm.value.listName;
      const modifiedListName = listNameFormValue.replace(' ', '_');
      const newListName =
        modifiedListName + '_' + Math.floor(Math.random() * 9999) + 1;

      const newList: List = {
        title: this.createListForm.value.listName,
        name: newListName,
        items: [],
        type: this.type,
      };
      this.lService.create(newList, this.parentListName);
      this.dialogRef.close();
      this.createListForm.reset();
    }
  }
}
