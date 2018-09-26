import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UniqueActService } from './uniqueAct.service';
import { Meta, Title } from '@angular/platform-browser'; 
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-one-act',
  templateUrl: './uniqueAct.component.html',
  styleUrls: ['./uniqueAct.component.scss']
})

export class UniqueActComponent implements OnInit {
  
  act:any;

  
  constructor(private uniqueActService: UniqueActService, private router: Router, private route: ActivatedRoute, private meta: Meta, private title: Title ) {  }
  
  ngOnInit() {
    this.route.paramMap
      .subscribe((data:any) => this.getAct(data.params.slug));
  }
  
  
  
  
  getAct(slug) {
      this.uniqueActService.getAct(slug)
      .subscribe((data:any) => {
        this.act = data.data;
        
    // set page title
    this.title.setTitle(this.act.title);
    
    // set page meta tags for facebook share
    this.meta.addTags([
      { property: 'og:image', content: environment.apiUrl+'/storage/'+this.act.image },
      { property: 'og:description', content: this.act.description }
      ]);
                  
      });
  }
}
