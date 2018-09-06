import { Component, OnInit } from '@angular/core';
import { StaticPageService } from './static-page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent implements OnInit {

  page:any;
  slug:string;
  
  
  constructor(private staticPageService: StaticPageService, private route: ActivatedRoute) { 
    route.data.subscribe(data => this.slug = data.slug); // get page slug from routing. 
  }

  ngOnInit() {
    this.getPage();
  }
  
  
  getPage() {
    this.staticPageService.getPage(this.slug).subscribe((data:any) => this.page = data.data);
  }
  

}
