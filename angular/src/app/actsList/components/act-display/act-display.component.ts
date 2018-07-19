import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActDisplayService } from './act-display.service';
import { MatSnackBar } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-act-display',
  templateUrl: './act-display.component.html',
  styleUrls: ['./act-display.component.scss']
})

export class ActDisplayComponent implements OnInit {


constructor(private actDisplayService: ActDisplayService, public snackBar: MatSnackBar) {
  if(localStorage.getItem('access_token')) this.logged = true; // if there is access token in storage, user is logged
}


@Input() act;
@Input() dateAlias; // current date alias like Today, Tomorrow
@Input() dateAliases; // list of all generated date aliases
viewDateAlias:string;
aliasCount:number;
eventUrlPre:string;
storageLink:string;
logged:boolean = false;
isBookmarked:boolean;









  ngOnInit() {
    console.log(this.act);
    
    if(this.act.is_bookmarked) this.isBookmarked = true;
    else this.isBookmarked = false;
      
    // initialize storage link for photos and eventUrlPre for sharers
    this.storageLink = environment.apiUrl+'/storage'; // for photos
    this.eventUrlPre = environment.webUrl+'/event'; // for sharers
    let aliasCount = this.dateAliases.filter(x => x === this.dateAlias).length;
    this.aliasCount = aliasCount;
    console.log(aliasCount);
    if(aliasCount==1) {
      const tempAlias = this.dateAlias;
      this.viewDateAlias = tempAlias;
    }
    console.log(this.viewDateAlias);
  }
  

  
  // save or unsave bookmark
  toggleBookmark() {
    if(!this.logged) {
      // if user is not logged, notify him with snackbar
      this.snackBar.open('To bookmark event, you need to be logged in', null, { duration: 2000});
    } 
    else {
      this.isBookmarked = !this.isBookmarked;   
      console.log('act id'+this.act.id);
      // if user is logged, save or unsave bookmark
      this.actDisplayService.toggleBookmark(this.act.id).subscribe();
    }
  }
  




  
  
}
