import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router'; 
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
  
  isLoginError = false;
  
  ngOnInit() {
  }
  
  constructor(private userService: UserService, private router: Router) {}
  
  
   onSubmit(username, password) {
      this.userService.userAuthentication(username, password).subscribe((data:any)=>{
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/home']);
      },
      (Err: Response)=>{
        this.isLoginError = true;
      });
    }
    
    


}



