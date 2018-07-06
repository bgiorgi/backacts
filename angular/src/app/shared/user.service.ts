import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

// define observable, which will share user information through the app, at the moment menu component
private userSource = new BehaviorSubject({});
currentUser = this.userSource.asObservable();


  constructor(private http: HttpClient) { }
  
        getUserInfo() {
          let access_token = localStorage.getItem('access_token');
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+access_token
            })
          }
          return this.http.get(environment.apiUrl+'/api/user', httpOptions);
        }
        
  
  
  
  changeCurrentUser(userData) {
  this.userSource.next(userData);
}        


}
