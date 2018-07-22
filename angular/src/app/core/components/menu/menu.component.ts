import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  
  
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private searchFormService: SearchFormService){
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
      // this.searchForm.disable();
      this.formDisabled = true;
    }
  }
  
  
    createForm() {
    this.searchForm = this.fb.group({
      keyword: undefined,
      date: undefined,
      distance: undefined,
      price_max: undefined,
      order_by: undefined
    })
  }



  
  
// form value changes  
  valueChanges() {
    this.searchForm.valueChanges
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
