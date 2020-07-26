import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectDropdownComponent } from './select-dropdown.component';

@NgModule({
  declarations: [SelectDropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SelectDropdownComponent]
})
export class SelectDropdownModule { }
