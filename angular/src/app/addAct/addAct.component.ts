import { Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddActService } from './addAct.service';
import {MatSnackBar} from '@angular/material';



/**
 * @title Filter autocomplete
 */

@Component({
  selector: 'app-add-act',
  templateUrl: './addAct.component.html',
  styleUrls: ['./addAct.component.scss']
})

export class AddActComponent implements OnInit {
  

  // reactive form
  actForm:FormGroup;
  
  // autocomplete
  myControl: FormControl = new FormControl();
  options :any;
  filteredOptions: Observable<string[]>; 
  actAdded = false;
  
  
  age: string[];
  priceType: any;
  method: any;
  
  
  constructor(
    private addActService: AddActService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    
    this.createForm();
        
    addActService.getPlaces('Paris').subscribe(options => {
      this.options = options;
      console.log('retrieval google places');
          console.log(this.options);
      
    });
  
    
    this.age = ['none', '18+', '21+'];
    this.method = [{name: 'method1', value: 0}, {name: 'method2', value: 1}, {name: 'method3', value: 2}];
    
    
  }
  
  
  
  
  ngOnInit() {
    // autocomplete
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }
  
  
    createForm() {
    this.actForm = this.fb.group({
      title: '',
      date:'',
      time:'',
      duration:'',
      google_place_id:'',
      link:'',
      tags:'',
      age:'',
      alcohol:'',
      food:'',
      price_amount:'',
      price_method:'',
      ticket_link:'',
      description:''
    });
  }
  
  
  // autocomplete
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  
  
    onSubmit() {
    this.addActService.addAct(this.actForm.value).subscribe(results => {
      this.actAdded = true;
      this.snackBar.open('Act was added successfully',null,{
        duration:3000
      });
    });
  }

  
  


  
}





