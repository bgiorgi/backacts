import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    
  // set title based on route data
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  
  
  
  
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

