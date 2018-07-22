import { Component, OnInit } from '@angular/core';
import { LoginService } from './log-in.service';
import { Router } from '@angular/router'; 
import { Http, Response } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../shared/user.service'; //user service, which shares the data about the user

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
  

  
  ngOnInit() {
          // delete old storage data
    localStorage.removeItem('access_token');
    this.userService.changeCurrentUser({});
  }
  
  constructor(private loginService: LoginService, private router: Router, public snackBar: MatSnackBar, private userService: UserService) {}
  
  
   onSubmit(username, password) {
      this.loginService.userAuthentication(username, password).subscribe((data:any)=>{
        this.router.navigate(['/']);
      },
      (Err:any)=>{
        let errorMessage;
        if(Err.error.message)  errorMessage = Err.error.message;
        if(Err.error.hint)  errorMessage = Err.error.hint;

        this.snackBar.open('Failed! '+errorMessage, null, { duration: 4000});
      });
    }
    
    


}



