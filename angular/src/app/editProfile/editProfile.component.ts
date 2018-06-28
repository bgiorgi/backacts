import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss']
})

export class EditProfileComponent {
  age: string[];
  price: any;
  method: any;
  constructor() {
    this.age = ['none', '18+', '21+'];
    this.price = [{name: 'free', value: 0}, {name: 'non-free', value: 1}];
    this.method = [{name: 'method1', value: 0}, {name: 'method2', value: 1}, {name: 'method3', value: 2}];
  }
}
