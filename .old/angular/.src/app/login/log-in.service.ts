import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../shared/user.service'; //user service, which shares the data about the user
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient, private userService: UserService) { }
  
          userAuthentication(username, password) {
            
      
      // delete old storage data
    localStorage.removeItem('access_token');
    this.userService.changeCurrentUser({});
    
    
                let params = {
                  grant_type: 'password',
                  client_id: 2,
                  client_secret: 'LYP8Lb80i9yJCyZWga2OjNnC1S465Gn3CfoZ4jwt',
                  username: username,
                  password: password
                };
                return this.http.post<any>(environment.apiUrl+'/oauth/token', params)
                .pipe(
                map((data:any) => {
                   // save token in browser storage
        localStorage.setItem('access_token',data.access_token);
            // get user info and save in local storage
        this.userService.getUserInfo().subscribe((data:any) => {
          // save user information in observable
          this.userService.changeCurrentUser(data);
                });
        })
          );
        }
        
        


}