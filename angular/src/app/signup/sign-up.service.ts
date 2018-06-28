import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }
  
  
  signUp(username, email, password, passwordConfirm) {
    let params = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    }
    
    return this.http.post(environment.apiUrl+'/api/user/sign-up',params);
  }
  
  
}
