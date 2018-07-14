import { Component } from '@angular/core';
import { UserService } from './shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
  constructor(private userService: UserService) {
              let access_token = localStorage.getItem('access_token');
          if(access_token) {
            // get user info and save in local storage
        this.userService.getUserInfo().subscribe((data:any) => {
          // save user information in observable
          this.userService.changeCurrentUser(data);
        });    
      }  
  }
}

