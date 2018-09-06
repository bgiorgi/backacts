import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPageService {

  constructor(private http: HttpClient) { }
  
  getPage(slug) {
    return this.http.get(environment.apiUrl+'/api/get-static-page', { params: {slug: slug} });
  }
  
}
