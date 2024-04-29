
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';


import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { MaterialModule } from './material.module';




const BASE_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule
];

const Guards = [UnsavedChangesGuard];

const Pipes = [
  EllipsisPipe,
  NoSanitizePipe,
];

const Directives:any[] = [];

@NgModule({
  declarations: [
    Pipes,
    Directives,

    SpinnerComponent,
    NoInternetComponent,
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [Guards],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
