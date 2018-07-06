import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UniqueActService } from './uniqueAct.service';

@Component({
  selector: 'app-one-act',
  templateUrl: './uniqueAct.component.html',
  styleUrls: ['./uniqueAct.component.scss']
})

export class UniqueActComponent implements OnInit {
  
  act:any;

  
  constructor(private uniqueActService: UniqueActService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.paramMap
      .subscribe((data:any) => this.getAct(data.params.slug));
      

  }
  
  
  
  
  getAct(slug) {
      this.uniqueActService.getAct(slug)
      .subscribe((data:any) => this.act = data.data);
  }
}
