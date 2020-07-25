import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { QuestionRoutingModule } from './question-list-routing.module';
import { PaginationMOdule } from '../atoms/pagination/pagination.module';

@NgModule({
  declarations: [ QuestionListComponent ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    PaginationMOdule
  ]
})
export class QuestionlistModule { }
