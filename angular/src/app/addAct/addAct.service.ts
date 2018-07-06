import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddActService {

  constructor(private http: HttpClient) { }
  
  getGooglePlaces(input) {
    // query parameters to send
    let params = {
      input: input,
    }
    
    let access_token = localStorage.getItem('access_token');  
    let headers = {
      'Authorization': 'Bearer '+access_token
    }
    
    return this.http.get(environment.apiUrl+'/api/google-places/autocomplete',{params:params,headers:headers});

    

  }
  
  
  
  addAct(params) {
    let access_token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+access_token
      })
    }

    return this.http.post(environment.apiUrl+'/api/events/add',params,httpOptions);
  }
  
  
  
  
  uploadImage(selectedImage) {
    let access_token = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+access_token
      })
    }
    console.log('uploading file...');
    const uploadData = new FormData();
    uploadData.append('image',selectedImage, selectedImage.name);
    return this.http.post(environment.apiUrl+'/api/upload-image',uploadData,httpOptions);
  }
  
  
  
}
