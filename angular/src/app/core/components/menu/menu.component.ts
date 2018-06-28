import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  acts: any[];
  constructor(){
    this.acts = [
      {name: 'All acts', value: 0},
      {name: 'Act1', value: 1},
      {name: 'Act2', value: 2},
    ];
  }

  ToggleMenu() {
    const menu = document.getElementsByClassName('menu-wrapper')[0];
    menu.classList.toggle('shown');

    const background = document.getElementsByClassName('dark-background')[0];
    background.classList.toggle('shown');
  }

  ngOnInit() {
  }
}
