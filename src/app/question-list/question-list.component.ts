import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questionsList: any = [];
  items = [];
  pageSize = 10;
  page = 1;
  maxPages = 5;
  constructor (public qs: QuestionService ) {}
  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
    this.questionsList = [];
    const questionPayload: any ={
      page: this.page
    }
    this.qs.getQuestion(questionPayload).subscribe((response: any) => {
      this.questionsList = response && response.items ? response.items : [];
      if (this.items && this.items.length === 0) {
        this.items = [];
        this.items.length = response.quota_remaining;
      }
    } );
  }

  onChangePage(pageItem) {
    this.page = pageItem;
    this.getQuestions();
  }
}
