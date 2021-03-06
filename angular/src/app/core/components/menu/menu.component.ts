import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../../../shared/user.service';
import { SearchFormService } from '../../../shared/search-form.service'; // to share data by behaviour subject





@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  
  @ViewChild('picker') picker;
  
  @Input() actsType;
  

  eventType:string;
  searchForm: FormGroup;
  logged:boolean = false;
  currentUser:any;
  coords:any;
  datePickerPristine:boolean = true;
  formDisabled:boolean;
  searchFormSubscription;

  
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private searchFormService: SearchFormService){
        // fetch user date from user service, if exists
        this.userService.currentUser.subscribe((data:any) => {
          if(data.id) {
          this.logged = true;
          this.currentUser = data;
          }
                  });
        this.createForm();
  }



  ngOnInit() {
    this.valueChanges();
    if(this.actsType!=='all' && this.actsType!='interests') {
      this.formDisabled = true;
    }
    
  // get url keyword parameter and put in keyword input  
  this.route.paramMap.subscribe((data:any) => this.searchForm.controls['keyword'].setValue(data.params.keyword));
  // change url keyword parameter, when keyword input changes
  this.searchForm.controls['keyword'].valueChanges.subscribe(value => {
    if(value!=null) this.router.navigate(['/acts/all',{keyword:value}]);
    else this.router.navigate(['/acts/all']);
});
  
  }
  

  ngOnDestroy() {
    this.searchFormSubscription.unsubscribe();
  }
  
    createForm() {
    this.searchForm = this.fb.group({
      keyword: undefined,
      date: undefined,
      distance: undefined,
      price_max: undefined,
      order_by: undefined
    });



  }



  
  
// form value changes  
  valueChanges() {
    this.searchFormSubscription = this.searchForm.valueChanges
    .subscribe(values => {
      // prepare data for service listener which will load data in acts list component
      let params:any = {};
      if(values.keyword) params.keyword = values.keyword;
      if(values.date) params.date = moment(values.date).format('YYYY-MM-DD');
      if(values.date) params.date = moment(values.date).format('YYYY-MM-DD');
      if(values.distance) params.distance = values.distance;
      if(values.price_max) params.price_max = values.price_max;

      if(this.coords) {
      params.lat = this.coords.latitude;
      params.lng = this.coords.longitude;
      }
      this.searchFormService.changeCurrentParams(params);
      

    })
  }
  
  
  
  
  enableBrowserLocation() {
    if(!this.coords) {
      navigator.geolocation.watchPosition((position) => {
      this.coords = position.coords;
          });  
    }
  }
  
 
 
 
// website menu
  ToggleMenu() {
    const menu = document.getElementsByClassName('menu-wrapper')[0];
    menu.classList.toggle('shown');

    const background = document.getElementsByClassName('dark-background')[0];
    background.classList.toggle('shown');
  }  
  
  
  
  openPickerPristine() {
    if(this.datePickerPristine==true) {
      this.datePickerPristine = false;
      this.picker.open();
    }
  }
  
  
}
