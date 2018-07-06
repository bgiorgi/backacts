import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient) { }
  
          userAuthentication(username, password) {
                let params = {
                  grant_type: 'password',
                  client_id: 2,
                  client_secret: 'LYP8Lb80i9yJCyZWga2OjNnC1S465Gn3CfoZ4jwt',
                  username: username,
                  password: password
                };
                return this.http.post(environment.apiUrl+'/oauth/token', params);
        }
        
        


}