import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { QuestionRoutingModule } from './question-list-routing.module';
import { PaginationMOdule } from '../atoms/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { SelectDropdownModule } from '../atoms/select-dropdown/select-dropdown.module';

@NgModule({
  declarations: [ QuestionListComponent ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    PaginationMOdule,
    FormsModule,
    SelectDropdownModule
  ]
})
export class QuestionlistModule { }
