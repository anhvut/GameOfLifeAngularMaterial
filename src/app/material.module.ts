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
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  declarations: [
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
    MatButtonToggleModule
  ]
})
export class MaterialModule {}

