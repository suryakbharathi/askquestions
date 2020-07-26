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
  title: any = '';
  notFound: any = false;
  hasMore: any = false;
  tags: any = [];
  progressdefault: any = 'Tags';
  tagString: any = '';
  qAccepted: any = false;

  constructor (public qs: QuestionService ) {}
  ngOnInit() {
    this.qs.getTags().subscribe((response: any) => {
      if (response?.items?.length) {
        const tagList = response.items.map((data: any) => { return data.name });
        tagList.forEach(element => {
          this.tags.push( {
            label: element,
            value: element,
            checked: false
          });
        });
      }
    });
    this.getQuestions();
  }
  getQuestions() {
    this.questionsList = [];
    let questionPayload: any ={
      page: this.page ? this.page : 1,
      title: this.title,
      tagged: this.tagString,
      accepted : this.qAccepted ? true : false
    };
    this.notFound = false;
    this.hasMore = false;
    this.qs.getQuestion(questionPayload).subscribe((response: any) => {
      this.questionsList = response && response.items ? response.items : [];
      this.hasMore = response && response.has_more ? true : false;
      if (!(this.questionsList && this.questionsList.length)) {
        this.notFound = true;
      } else {
        this.notFound = false;
      }
      if (this.items && this.items.length === 0) {
        this.items = [];
        this.items.length = response.quota_max;
      }
    }, (error: any) => {
      console.log(error, 'error getquestions');
    } );
  }

  onChangePage(pageItem) {
    this.page = pageItem;
    this.getQuestions();
  }

  onSearchback(event) {
    if (event.keyCode === 8) {
      this.getQuestions();
    }
  }

  setFilterData(event, type) {
    if (event) {
      if (event.value && event.value.length) {
        this.tagString = '';
        event.value.forEach(element => {
            this.tagString =  this.tagString + element + ';';
        });
      } else {
        this.tagString = '';
      }
      this.getQuestions();
    }
  }

}
