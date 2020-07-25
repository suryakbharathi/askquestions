import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  api = 'https://api.stackexchange.com'
  constructor(private http: HttpClient) { }

  getQuestion(payload) {
    return this.http.get(this.api + '/2.2/search/advanced?page=' + payload.page + '&pagesize=10&order=desc&sort=activity&site=stackoverflow');
  }

}
