import { Component, OnInit } from '@angular/core';
import { ActsListService } from './actsList.service';
import { SearchFormService } from '../shared/search-form.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map, concatMap } from 'rxjs/operators';




@Component({
  selector: 'app-act-list',
  templateUrl: './actsList.component.html',
  styleUrls: ['./actsList.component.scss']
})

export class ActsListComponent implements OnInit {
  
  actsType:string; // all, interests, bookmarked, uploads
  acts:any;
  currentPage:number = 1;
  isLoading = true;
  isAppending = false;
  params:any;
  actsLoading:boolean;
  searchFormSubscription;

  


  
  
  constructor(private actsListService: ActsListService, private searchFormService: SearchFormService, private route: ActivatedRoute,    public snackBar: MatSnackBar) {
      this.actsType = null;
      route.data.subscribe(data => this.actsType = data.actsType); // get actsType from routing. all, interests, bookmarked, uploads
  }
  
  
  ngOnInit() {
    //this.searchFormService.changeCurrentParams({});
    //get shared search data
    this.searchFormSubscription = this.searchFormService.currentParams.subscribe(data => {
      this.params = data;
      this.getActs(data);
    });
          
  }
  
  
  ngOnDestroy(){
    this.searchFormSubscription.unsubscribe();
    this.searchFormService.changeCurrentParams({});        
  }
  
  
  // getacts 
  getActs(params) {
      this.actsLoading = true;    
    return this.actsListService.getActs(params,this.actsType).subscribe(data => {
      this.acts = data;
      this.actsLoading = false
      });
  }
  
  
  
  // detect scroll to append acts
  onScroll() {
    if(this.acts) {
    let lastPage = this.acts.meta.last_page;
    if(lastPage>1 && lastPage==this.currentPage) this.snackBar.open('No more acts',null,{ duration: 2000})
    else if(this.currentPage < lastPage) {
      this.currentPage++;
      this.params.page = this.currentPage;
      this.appendActs();  
      }
    }
  }
  
  
  // on scroll append acts
  appendActs() {
    this.isAppending = true;
   this.actsListService.getActs(this.params,this.actsType)
  .subscribe((data:any) => {
    this.acts.data = this.acts.data.concat(data.data)
    this.isAppending = false;
    });
  }   
  
  

  
  
}






