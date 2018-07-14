import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagWrapperService {

  constructor(private http: HttpClient) { }
  
  
  getPopularTags() {
    let access_token = localStorage.getItem('access_token');
    let headers = {
      'Authorization' : 'Bearer '+access_token
    }
    return this.http.get(environment.apiUrl+'/api/profile-popular-tags',{ headers: headers });
  }
  
  
}
