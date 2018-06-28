import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-act-list',
  templateUrl: './actsList.component.html',
  styleUrls: ['./actsList.component.scss']
})

export class ActsListComponent implements OnInit {
  ngOnInit() {
    navigator.geolocation.watchPosition((position) => console.log(position))
  }
}
