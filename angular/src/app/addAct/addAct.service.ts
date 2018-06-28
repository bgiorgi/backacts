import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddActService {

  constructor(private http: HttpClient) { }
  
  getPlaces(input) {
    let params = {
      input: input,
      types: 'geocode',
      key: 'AIzaSyBvaUiRxSCYYfbHYvONJUViQ6xpkPIqejE'
    }
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json',{params:params})
  }
  
  
  
  addAct(params) {
    console.log('params');
    console.log(params);
    return this.http.post(environment.apiUrl+'/api/events/add',params);
  }
  
}
