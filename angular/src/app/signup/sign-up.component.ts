import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  
  signedUp = false;
  isSignupError = false;
  
  constructor(private signUpService: SignUpService, public snackBar: MatSnackBar, private router: Router) {}
  
     onSubmit(username, email, password, passwordConfirm) {
      this.signUpService.signUp(username, email, password, passwordConfirm).subscribe((data:any)=>{
        this.signedUp = true;
        this.snackBar.open('Registration was successful',null,{
          duration:3000
        });
        
        
        setTimeout((router: Router) => {
        this.router.navigate(['nextRoute']);
    }, 3000);  



        
      },
      (Err: Response)=>{
        this.isSignupError = true;
        this.snackBar.open('There was an error while registration');
      });
    }
    
    
    
    



}



