import { Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddActService } from './addAct.service';
import {MatSnackBar} from '@angular/material';
import * as moment from 'moment';

export interface GooglePlace {
  description: string,
  place_id: string
}


@Component({
  selector: 'app-add-act',
  templateUrl: './addAct.component.html',
  styleUrls: ['./addAct.component.scss']
})

export class AddActComponent implements OnInit {
  
  responseErrors:any;

  // reactive form
  actForm:FormGroup;
  

  // file to upload
  selectedImage: File;
  uploadedImage: any; // uploaded image data from backend
  
  // form state
  actAdded = false;
  
  // price selects
  priceTypes = ['method1', 'Method 2','method3'];
  priceMethods = [{name: 'method1', value: 'Method 1'}, {name: 'method2', value: 'Method 2'}, {name: 'method3', value: 'Method 3'}];
  
  // options for autocomplete
  options:any = [];
  filteredOptions: Observable<any[]>;
  value:string;
  filtered:any;
  
  
  constructor(
    private addActService: AddActService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    
    this.createForm();
  }
  
  
  
  
  ngOnInit() {
    this.filteredOptions = this.actForm.get('google_place').valueChanges
    .pipe(
        startWith<string | GooglePlace>(''),
        map(value => typeof value === 'string' ? value : value.description),
        map(description => description ? this._filter(description) : this.options.slice())
      );
  }
  
  
  
  displayFn(option?: GooglePlace): string | undefined {
    return option ? option.description : undefined;
  }
  
  private _filter(value:string): GooglePlace[] {
    this.value = value;
    this.addActService.getGooglePlaces(value).subscribe(data => {
      this.options = data;
      const filterValue = this.value.toLowerCase();
      this.filtered = this.options.filter(option => option.description.toLowerCase().indexOf(filterValue) === 0)
    });
      return this.filtered;
  }
  
  
  
  
  

  
  
  
  
  
    createForm() {
    this.actForm = this.fb.group({
      title: '',
      date:'',
      time:'',
      duration_hours:'',
      google_place:'',
      link:'',
      tags:'',
      min_age:'',
      alcohol:'',
      food:'',
      price_amount:'',
      price_method:'',
      ticket_link:'',
      description:'',
      image: ''
    });
  }
  

  
  // when file is selected by user in view
  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
    this.addActService.uploadImage(this.selectedImage).subscribe(data => this.actForm.patchValue({image: data}));
  }
  
  
    // on form submit
    onSubmit() {
    this.addActService.addAct(this.actForm.value).subscribe(results => {
      this.actAdded = true;
      this.snackBar.open('Act was added successfully',null,{
        duration:3000
      });
    },
    (Err:any) => {
      console.log(Err);
      this.responseErrors = Err.error.errors;
      this.snackBar.open('Act submit failed',null, {duration: 4000});
    });
  }

  
  


  
}





