import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
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
  imports: [DialogModule, ReactiveFormsModule, FormsModule],
  template: `
    <button (click)="onCreateNewList()">
      <ng-content></ng-content>
    </button>

    <ng-template #createListFormTemplate>
      <form [formGroup]="createListForm">
        <input name="listNameControl" type="text" formControlName="listName" />
      </form>
      <div>
        <button (click)="onSave()">Save</button>
        <button (click)="onClose()">Close</button>
      </div>
    </ng-template>
  `,
})
export class ListCreator {
  private dialogRef: DialogRef<any, any> | null = null;

  @Input() type!: ListTypesEnum;
  @ViewChild('createListFormTemplate') createListFormTemplate!: any;

  listNameFormControl = new FormControl<string>('', [Validators.required]);
  createListForm = new FormGroup<any>({
    listName: this.listNameFormControl,
  });

  constructor(
    private readonly dialog: Dialog,
    private readonly lService: ListsService
  ) {}

  onCreateNewList() {
    this.dialogRef = this.dialog.open(this.createListFormTemplate, {
      height: '400px',
      width: '600px',
      panelClass: 'my-dialog',
    });
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

      const newList: List = {
        title: this.createListForm.value.listName,
        name: modifiedListName + '_' + Math.floor(Math.random() * 9999) + 1,
        items: [],
        type: this.type,
      };
      this.lService.create(newList);
      this.dialogRef.close();
      this.createListForm.reset();
    }
  }
}
