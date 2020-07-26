import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  api = 'https://api.stackexchange.com';
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  toggleVisibility() {
    this.sidebarVisibilityChange.next(false)
  }
  constructor(private http: HttpClient) { }

  getQuestion(payload) {
    return this.http.get(this.api + '/2.2/search/advanced?page=' + payload.page + '&title=' + payload.title + '&tagged=' + payload.tagged + '&accepted=' + payload.accepted + '&pagesize=10&order=desc&sort=activity&site=stackoverflow');
  }

  getTags() {
    return this.http.get(this.api + '/2.2/tags?order=desc&sort=popular&site=stackoverflow');
  }

}
