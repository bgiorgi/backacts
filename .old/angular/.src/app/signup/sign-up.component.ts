import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
// import login service, to autenticate users
import { LoginService } from '../login/log-in.service';

  


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  

  
  responseErrors:any;
  returnUrl: string;
  
  
  signedUp = false;
  // form ngModels
  model:any = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  
  constructor(private signUpService: SignUpService, public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private loginService: LoginService) {  }
  
  
    ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  
  
  
     onSubmit(username, email, password, password_confirmation) {
      this.signUpService.signUp(username, email, password, password_confirmation).subscribe((data:any)=>{
        this.signedUp = true;
                
        // autenticate users and save token in local storage
        this.loginService.userAuthentication(username, password).subscribe();
        
        this.snackBar.open('Registration was successful',null,{
          duration:3000
        });
        

        
        setTimeout((router: Router) => {
        this.router.navigateByUrl(this.returnUrl);
    }, 3000);  



        
      },
      (Err:any)=>{
        this.responseErrors = Err.error.errors;
        this.snackBar.open('There was an error while registration, please check the fields',null,{duration:4000});
      });
    }
    
    
    
    



}



