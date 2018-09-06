import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActDisplayService {

  constructor(private http: HttpClient) { }
  
  toggleBookmark(event_id) {
      let access_token = localStorage.getItem('access_token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+access_token
        })
      }
      let params = { 'event_id': event_id };
      return this.http.post(environment.apiUrl+'/api/toggle-bookmark',params, httpOptions);
  }
  
  
}
