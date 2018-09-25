import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchFormService {


    
    private paramsSource = new BehaviorSubject({});
    currentParams = this.paramsSource.asObservable();



  constructor() { }
  
  
      
  changeCurrentParams(data) {
  this.paramsSource.next(data);
  }        

    
    
    
}






