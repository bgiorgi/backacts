import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActDisplayService } from './act-display.service';

@Component({
  selector: 'app-act-display',
  templateUrl: './act-display.component.html',
  styleUrls: ['./act-display.component.scss']
})

export class ActDisplayComponent implements OnInit {


constructor(private actDisplayService: ActDisplayService) {}


@Input() act;
userId:number;
eventUrlPre:string;
storageLink:string;







  ngOnInit() {
    this.storageLink = environment.apiUrl+'/storage';
    this.eventUrlPre = environment.webUrl+'/event';
  }
  
  
  toggleBookmark() {

    this.actDisplayService.toggleBookmark(this.act.id).subscribe(data => {
          this.act.is_bookmarked = !this.act.is_bookmarked;
    });
  }
  
}
