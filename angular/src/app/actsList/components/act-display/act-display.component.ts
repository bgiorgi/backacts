import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActDisplayService } from './act-display.service';
import { MatSnackBar } from '@angular/material';
import { SearchFormService } from '../../../shared/search-form.service';
import * as copy from 'copy-to-clipboard';
import {Router} from '@angular/router'
 

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-act-display',
  templateUrl: './act-display.component.html',
  styleUrls: ['./act-display.component.scss']
})

export class ActDisplayComponent implements OnInit {


constructor(private actDisplayService: ActDisplayService, public snackBar: MatSnackBar, private searchFormService: SearchFormService, private router: Router) {
  if(localStorage.getItem('access_token')) this.logged = true; // if there is access token in storage, user is logged
}


@Input() act;

eventUrlPre:string;
storageLink:string;
logged:boolean = false;
isBookmarked:boolean;









  ngOnInit() {
    if(this.act.is_bookmarked) this.isBookmarked = true;
    else this.isBookmarked = false;
      
    // initialize storage link for photos and eventUrlPre for sharers
    this.storageLink = environment.apiUrl+'/storage'; // for photos
    this.eventUrlPre = environment.webUrl+'/events'; // for sharers

  }
  

  
  // save or unsave bookmark
  toggleBookmark() {
    if(!this.logged) {
      // if user is not logged, notify him with snackbar
      this.snackBar.open('To bookmark event, you need to be logged in', null, { duration: 2000});
    } 
    else {
      this.isBookmarked = !this.isBookmarked;   
      // if user is logged, save or unsave bookmark
      this.actDisplayService.toggleBookmark(this.act.id).subscribe();
    }
  }
  





  copyLink() {
    copy(environment.webUrl+'/events/'+this.act.slug);
      this.snackBar.open('Link was copied', null, { duration: 2000});
  }

  
  
}
