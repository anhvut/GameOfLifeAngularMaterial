import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSliderModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonToggleModule,
} from '@angular/material';

/* MessageBox from https://github.com/trashvin/messagebox-like-angular-alertbox */
import { MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MessageService} from './_shared/message.service';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';


@NgModule({
  declarations: [
    SimpleDialogComponent
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    MessageService
  ]
})
export class MaterialModule {}

